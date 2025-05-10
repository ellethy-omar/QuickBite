const Driver = require('../../models/Driver')
const Message = require('../../models/Message')
const mongoose = require('mongoose')
const { markMessagesAsRead, getMessages, getActiveChats } = require('../../services/chatService')
const Order = require('../../models/Order')
const Chat = require('../../models/Chat')

const getActiveChatsUser = async(req,res )=> {
    try {
        const chats = await getActiveChats(req.user._id, 'user');
        
        // Get last message for each chat
        const chatsWithPreview = await Promise.all(chats.map(async (chat) => {
          const lastMessage = await Message.findOne({ chatId: chat._id })
            .sort({ createdAt: -1 })
            .limit(1);
            
          // Find the driver participant
          const driverParticipant = chat.participants.find(p => p.participantType === 'driver');
          const driver = driverParticipant ? 
            await Driver.findById(driverParticipant.participantId, 'name profilePicture vehicle phone') : 
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
            driver: driver ? {
              _id: driver._id,
              name: driver.name,
              profilePicture: driver.profilePicture,
              vehicle: driver.vehicle,
              phone: driver.phone
            } : null,
            order: order ? {
              _id: order._id,
              status: order.status,
              totalAmount: order.totalAmount
            } : null,
            lastMessage: lastMessage ? {
              content: lastMessage.content,
              createdAt: lastMessage.createdAt,
              isFromUser: lastMessage.senderId.toString() === req.user._id.toString()
            } : null,
            unreadCount
          };
        }));
        
        res.json(chatsWithPreview);

        console.log('chatsWithPreview:', chatsWithPreview);
      } catch (err) {
        console.error('Error getting user chats:', err);
        res.status(500).json({ message: 'Failed to get chats', details: err.message });
      }
}

const getAllChatsUser = async(req, res)=> {
    try {
          const chats = await Chat.find({
                participants: {
                $elemMatch: { 
                    participantId: req.user._id, 
                    participantType: 'user' 
                }
                }
            }).sort({ lastActivity: -1 });
        
        // Get last message for each chat
        const chatsWithPreview = await Promise.all(chats.map(async (chat) => {
          const lastMessage = await Message.findOne({ chatId: chat._id })
            .sort({ createdAt: -1 })
            .limit(1);
            
          // Find the driver participant
          const driverParticipant = chat.participants.find(p => p.participantType === 'driver');
          const driver = driverParticipant ? 
            await Driver.findById(driverParticipant.participantId, 'name profilePicture vehicle phone') : 
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
            driver: driver ? {
              _id: driver._id,
              name: driver.name,
              profilePicture: driver.profilePicture,
              vehicle: driver.vehicle,
              phone: driver.phone
            } : null,
            order: order ? {
              _id: order._id,
              status: order.status,
              totalAmount: order.totalAmount
            } : null,
            lastMessage: lastMessage ? {
              content: lastMessage.content,
              createdAt: lastMessage.createdAt,
              isFromUser: lastMessage.senderId.toString() === req.user._id.toString()
            } : null,
            unreadCount
          };
        }));
        
        res.json(chatsWithPreview);

        console.log('chatsWithPreview:', chatsWithPreview);
      } catch (err) {
        console.error('Error getting user chats:', err);
        res.status(500).json({ message: 'Failed to get chats', details: err.message });
      }
}


const getMessagesUser = async (req, res) => {
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

module.exports = {
    getActiveChatsUser,
    getMessagesUser,
    getAllChatsUser
}