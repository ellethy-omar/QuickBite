const Driver = require('../../models/Driver')
const Message = require('../../models/Message')
const mongoose = require('mongoose');
const { chatWithAI } = require('../../services/aiAgent');
const {
  getOrCreateChat,
  sendMessage,
  getMessages,
  markMessagesAsRead,
  getActiveChats
} = require('../../services/chatService');

const driverRoutes = async (ws, driver) => {
    global.driverClients.set(driver._id, ws);
    ws.send(JSON.stringify({ type: 'connection', data: 'Driver connected' }));
    console.log("Driver connected, current count of drivers = ", global.driverClients.size);
  
    ws.on('message', async message => {
      const { type, data } = JSON.parse(message);
      if(!type) {
        console.log('Admin WS got unknown type', type);
        ws.send(JSON.stringify({
          type: 'error',
          data: 'Where is the type?'
        }));
        return;
      }
      if(!data) {
        console.log('Admin WS got unknown data', data);
        ws.send(JSON.stringify({
          type: 'error',
          data: 'Where is the data?'
        }));
        return;
      }

      console.log('Driver route heard a message:', { type, data });

      switch (type) {
        case 'locationUpdate': {
          // const { orderId, latitude, longitude, userId } = data;
          // // broadcast to user & admins
          // global.userClients.get(userId)
          //   ?.send(JSON.stringify({ type: 'locationUpdate', data }));
          // global.adminClients.forEach(sock =>
          //   sock.send(JSON.stringify({ type: 'locationUpdate', data }))
          // );
          break;
        }
        case 'acceptOrder': {
          // const { orderId, userId } = data;
          // // notify the user only
          // global.userClients.get(userId)
          //   ?.send(JSON.stringify({ type: 'orderAccepted', data }));
          break;
        }

        case 'chatInit':
          try {
            if (!data.userId || !data.orderId) {
              throw new Error('Missing userId or orderId');
            }
            
            const userId = new mongoose.Types.ObjectId(data.userId);
            const orderId = new mongoose.Types.ObjectId(data.orderId);

            if (!mongoose.Types.ObjectId.isValid(data.userId) || !mongoose.Types.ObjectId.isValid(data.orderId)) {
               throw new Error('Invalid driverId');
            }
            
            const chat = await getOrCreateChat(
              userId, 
              driver._id,
              orderId
            );
            
            // Get recent messages
            const messages = await getMessages(chat._id);
            
            // Mark messages as read
            await markMessagesAsRead(chat._id, driver._id);
            
            ws.send(JSON.stringify({
              type: 'chat_initialized',
              data: {
                chatId: chat._id,
                messages
              }
            }));
            console.log("Responed with ", messages)
          } catch (err) {
            console.log('Error initializing chat:', err);
            ws.send(JSON.stringify({
              type: 'error',
              data: `Failed to initialize chat: ${err.message}`
            }));
          }
          break;
          
        case 'chatSend':
          try {
            if (!data.chatId || !data.content) {
              throw new Error('Missing chatId or content');
            }
            
            const chatId = new mongoose.Types.ObjectId(data.chatId);

            if (!mongoose.Types.ObjectId.isValid(data.chatId)) {
                throw new Error('Invalid chatId');
            }
            
            const message = await sendMessage(
              chatId,
              driver._id,
              'driver',
              data.content
            );
            
            ws.send(JSON.stringify({
              type: 'messageSent',
              data: {
                messageId: message._id,
                chatId: message.chatId,
                timestamp: message.createdAt
              }
            }));
            await markMessagesAsRead(chatId, driver._id);
            console.log("Responed with ", message)
          } catch (err) {
            console.log('Error sending message:', err);
            ws.send(JSON.stringify({
              type: 'error',
              data: `Failed to send message: ${err.message}`
            }));
          }
          break;
          
        case 'chatLoadMore':
          try {
            if (!data.chatId) {
              throw new Error('Missing chatId');
            }
            
            const chatId = new mongoose.Types.ObjectId(data.chatId);

            if (!mongoose.Types.ObjectId.isValid(data.chatId)) {
                throw new Error('Invalid chatId');
            }
            
            const before = data.before ? new Date(data.before) : null;
            const limit = data.limit || 20;
            
            const messages = await getMessages(chatId, limit, before);
            
            ws.send(JSON.stringify({
              type: 'chatMessages',
              data: {
                chatId,
                messages,
                hasMore: messages.length === limit
              }
            }));
            await markMessagesAsRead(chatId, driver._id);

            console.log("Responded with: ", messages)
          } catch (err) {
            console.log('Error loading messages:', err);
            ws.send(JSON.stringify({
              type: 'error',
              data: `Failed to load messages: ${err.message}`
            }));
          }
          break;
          
        case 'chatMarkRead':
          try {
            if (!data.chatId) {
              throw new Error('Missing chatId');
            }
            
            const chatId = new mongoose.Types.ObjectId(data.chatId);

            if (!mongoose.Types.ObjectId.isValid(data.chatId)) {
                throw new Error('Invalid chatId');
            }
            
            const count = await markMessagesAsRead(chatId, driver._id);
            
            ws.send(JSON.stringify({
              type: 'messagesMarkedRead',
              data: {
                chatId,
                count
              }
            }));
          } catch (err) {
            console.log('Error marking messages as read:', err);
            ws.send(JSON.stringify({
              type: 'error',
              data: `Failed to mark messages as read: ${err.message}`
            }));
          }
          break;

        case 'ai':
            try {
              const aiResponse = await chatWithAI(data.prompt);
          
              ws.send(JSON.stringify({
                type: 'aiResponse',
                data: aiResponse
              }));
              console.log("Responded with: ", aiResponse)
            } catch (err) {
              console.log('Error in AI handler:', err.response?.data || err.message);
              ws.send(JSON.stringify({
                type: 'error',
                data: `AI service error: ${err.message}`
              }));
            }
          break;
        // …you can add chat, status updates, etc.
        default:
          console.log('Driver WS got unknown type', type);
          ws.send(JSON.stringify({
            type: 'error',
            data: 'Unhandled type'
          }));
      }
    });
  
    ws.on('close', () => {
      global.driverClients.delete(driver._id);
      console.log("A driver has disconnected, current count of drivers = ", global.driverClients.size);
    });
};
  

module.exports = driverRoutes;