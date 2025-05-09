const Chat = require('../models/Chat');
const Message = require('../models/Message');

const Order = require('../models/Order');
const { sendWSMessage } = require('../websockets/utils/wsUtils');

/**
 * Creates or retrieves a chat between a user and driver
 * @param {ObjectId} userId - User ID
 * @param {ObjectId} driverId - Driver ID
 * @param {ObjectId} orderId - Order ID that initiated this chat
 * @returns {Promise<Object>} Chat object
 */
const getOrCreateChat = async (userId, driverId, orderId) => {
  // Check if chat already exists for this user and driver
  let chat = await Chat.findByParticipants(userId, driverId);
  
  if (!chat) {
    // If not, check if there's an order connecting them
    const order = await Order.findOne({
      _id: orderId,
      userID: userId,
      deliveryDriverID: driverId
    });
    
    if (!order) {
      throw new Error('No order found connecting this user and driver');
    }
    
    // Create new chat
    chat = await Chat.create({
      participants: [
        { participantId: userId, participantType: 'user' },
        { participantId: driverId, participantType: 'driver' }
      ],
      orderId: order._id
    });
  } else {
    // Update last activity timestamp
    chat.lastActivity = new Date();
    chat.isActive = true;
    await chat.save();
  }
  
  return chat;
};

/**
 * Sends a message in a chat
 * @param {ObjectId} chatId - Chat ID
 * @param {ObjectId} senderId - Sender ID
 * @param {String} senderType - Either 'User' or 'Driver'
 * @param {String} content - Message content
 * @returns {Promise<Object>} Message object
 */
const sendMessage = async (chatId, senderId, senderType, content) => {
  // Validate chat exists
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new Error('Chat not found');
  }
  
  // Validate sender is part of the chat
  const isParticipant = chat.participants.some(p => 
    p.participantId.toString() === senderId.toString() && 
    p.participantType === senderType
  );
  
  if (!isParticipant) {
    throw new Error('Sender is not a participant in this chat');
  }
  
  // Create message
  const message = await Message.create({
    chatId,
    senderId,
    senderType,
    content
  });
  
  // Update chat's last activity
  chat.lastActivity = new Date();
  await chat.save();
  
  // Find recipient to notify via WebSocket
  const recipient = chat.participants.find(p => 
    p.participantId.toString() !== senderId.toString()
  );
  
  // Notify recipient via WebSocket
  if (recipient) {
    const recipientRole = recipient.participantType.toLowerCase();
    const recipientId = recipient.participantId;
    
    sendWSMessage(recipientRole, recipientId, 'newMessage', {
      chatId: chat._id,
      message: {
        _id: message._id,
        senderId,
        senderType,
        content,
        createdAt: message.createdAt
      }
    });
  }
  
  return message;
};

/**
 * Gets messages for a chat with pagination
 * @param {ObjectId} chatId - Chat ID
 * @param {Number} limit - Max number of messages to return
 * @param {Date} before - Only get messages before this timestamp
 * @returns {Promise<Array>} Messages
 */
const getMessages = async (chatId, limit = 20, before = null) => {
  const query = { chatId };
  
  if (before) {
    query.createdAt = { $lt: before };
  }

  // Inside a node REPL with Mongoose connected:

  const chats = await Message.find({ chatId: chatId });
  console.log(chats.length, chats);

  
  const messages = await Message.find(query)
    .sort({ createdAt: -1 })
    .limit(limit);
    console.log('messages:', messages);
  
  return messages.reverse();
};

/**
 * Mark messages as read
 * @param {ObjectId} chatId - Chat ID
 * @param {ObjectId} readerId - ID of the user marking messages as read
 * @returns {Promise<Number>} Number of messages marked as read
 */
const markMessagesAsRead = async (chatId, readerId) => {
  const result = await Message.updateMany(
    { 
      chatId,
      senderId: { $ne: readerId },
      isRead: false
    },
    { isRead: true }
  );
  
  return result.nModified;
};

/**
 * Gets active chats for a user or driver
 * @param {ObjectId} participantId - User or driver ID
 * @param {String} participantType - 'User' or 'Driver'
 * @returns {Promise<Array>} List of active chats
 */
const getActiveChats = async (participantId, participantType) => {
  const chats = await Chat.find({
    participants: {
      $elemMatch: { 
        participantId, 
        participantType 
      }
    },
    isActive: true
  }).sort({ lastActivity: -1 });
  
  return chats;
};

module.exports = {
  getOrCreateChat,
  sendMessage,
  getMessages,
  markMessagesAsRead,
  getActiveChats
};