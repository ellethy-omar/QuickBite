const { getMessages, getActiveChats, markMessagesAsRead } = require('../../services/chatService')
const User = require('../../models/User')
const mongoose = require('mongoose')
const Message = require('../../models/Message')
const Chat = require('../../models/Chat')
const Order = require('../../models/Order')

const getActiveChatsDriver = async (req, res) => {
    try {
        const chats = await getActiveChats(req.user._id, 'driver');
        
        // Get last message for each chat
        const chatsWithPreview = await Promise.all(chats.map(async (chat) => {
          const lastMessage = await Message.findOne({ chatId: chat._id })
            .sort({ createdAt: -1 })
            .limit(1);
            
          // Find the user participant
          const userParticipant = chat.participants.find(p => p.participantType === 'user');
          const user = userParticipant ? 
            await User.findById(userParticipant.participantId, 'name profilePicture phone') : 
            null;
            
          // Count unread messages
          const unreadCount = await Message.countDocuments({
            chatId: chat._id,
            senderId: { $ne: req.user._id },
            isRead: false
          });
          
          // Get order details
          const order = await Order.findById(chat.orderId, 'status totalAmount');
          
          return {
            _id: chat._id,
            user: user ? {
              _id: user._id,
              name: user.name,
              phone: user.phone,
              profilePicture: user.profilePicture
            } : null,
            order: order ? {
              _id: order._id,
              status: order.status,
              totalAmount: order.totalAmount
            } : null,
            lastMessage: lastMessage ? {
              content: lastMessage.content,
              createdAt: lastMessage.createdAt,
              isFromDriver: lastMessage.senderId.toString() === req.user._id.toString()
            } : null,
            unreadCount
          };
        }));
        
        res.json(chatsWithPreview);
    } catch (err) {
        console.error('Error getting driver chats:', err);
        res.status(500).json({ message: 'Failed to get chats' });
    }
}

const getMessagesDriver = async (req, res) => {
    const chatIdStr = req.query.chatId;
    if (!chatIdStr) {
        console.log("Chat ID is required");
        return res.status(403).json({ error: 'Chat ID is required' });
    }

    try {
        const chatId = new mongoose.Types.ObjectId(chatIdStr);

        const before = req.query.before ? new Date(req.query.before) : null;
        const limit  = parseInt(req.query.limit, 10) || 20;

        const messages = await getMessages(chatId, limit, before);

        await markMessagesAsRead(chatId, req.user._id);

        return res.json({
            messages,
            hasMore: messages.length === limit
        });

    } catch (err) {
        console.error('Error getting chat messages:', err);
        return res.status(500).json({ message: 'Failed to get messages' });
    }
};

const getAllChatsDriver = async(req, res)=> {
    try {
          const chats = await Chat.find({
                participants: {
                $elemMatch: { 
                    participantId: req.user._id, 
                    participantType: 'driver' 
                }
                }
            }).sort({ lastActivity: -1 });
        
        // Get last message for each chat
        const chatsWithPreview = await Promise.all(chats.map(async (chat) => {
          const lastMessage = await Message.findOne({ chatId: chat._id })
            .sort({ createdAt: -1 })
            .limit(1);
            
          // Find the user participant
          const userParticipant = chat.participants.find(p => p.participantType === 'user');
          const user = userParticipant ? 
            await User.findById(userParticipant.participantId, 'name profilePicture phone') : 
            null;
            
          // Count unread messages
          const unreadCount = await Message.countDocuments({
            chatId: chat._id,
            senderId: { $ne: req.user._id },
            isRead: false
          });
          
          // Get order details
          const order = await Order.findById(chat.orderId, 'status totalAmount');
          
          return {
            _id: chat._id,
            user: user ? {
              _id: user._id,
              name: user.name,
              phone: user.phone,
              profilePicture: user.profilePicture
            } : null,
            order: order ? {
              _id: order._id,
              status: order.status,
              totalAmount: order.totalAmount
            } : null,
            lastMessage: lastMessage ? {
              content: lastMessage.content,
              createdAt: lastMessage.createdAt,
              isFromDriver: lastMessage.senderId.toString() === req.user._id.toString()
            } : null,
            unreadCount
          };
        }));
        
        res.json(chatsWithPreview);
    } catch (err) {
        console.error('Error getting driver chats:', err);
        res.status(500).json({ message: 'Failed to get chats' });
    }
}

module.exports = {
    getActiveChatsDriver,
    getMessagesDriver,
    getAllChatsDriver
}