const Message = require('../../models/Message');
const User = require('../../models/User');
const mongoose = require('mongoose');
const { chatWithAI } = require('../../services/aiAgent');
const {
  getOrCreateChat,
  sendMessage,
  getMessages,
  markMessagesAsRead
} = require('../../services/chatService');

const userRoute = async (ws, userPayload) => {
    global.userClients.set(userPayload._id.toString(), ws);
    ws.send(JSON.stringify({ type: 'connection', data: 'User connected' }));
    console.log("User connected, current count of user = ", global.userClients.size);

    ws.on('message', async raw => {
      const { type, data } = JSON.parse(raw);
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

      console.log('User route heard a message:', { type, data });

      switch (type) {
        case 'chatInit':
          try {
            if (!data.driverId || !data.orderId) {
              throw new Error('Missing driverId or orderId');
            }
            
            const driverId = new mongoose.Types.ObjectId(data.driverId);
            const orderId = new mongoose.Types.ObjectId(data.orderId);

            if (!mongoose.Types.ObjectId.isValid(data.driverId) || !mongoose.Types.ObjectId.isValid(data.orderId)) {
                throw new Error('Invalid driverId');
            }
            
            const chat = await getOrCreateChat(
              userPayload._id, 
              driverId,
              orderId
            );
            
            // Get recent messages
            const messages = await getMessages(chat._id);
            
            // Mark messages as read
            await markMessagesAsRead(chat._id, userPayload._id);
            
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
              userPayload._id,
              'user',
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
            await markMessagesAsRead(chatId, userPayload._id);

            console.log("Responded with: ", message)
          } catch (err) {
            console.error('Error sending message:', err);
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
            await markMessagesAsRead(chatId, userPayload._id);

            console.log("Responded with: ", messages)
          } catch (err) {
            console.log('Error loading messages:', err);
            ws.send(JSON.stringify({
              type: 'error',
              data: `Failed to load messages: ${err.message}`
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
        default:
          console.log('User WS got unknown type', type);
          ws.send(JSON.stringify({
            type: 'error',
            data: 'Unhandled type'
          }));
      }
    });
  
    ws.on('close', () => {
      global.userClients.delete(userPayload._id.toString());
      console.log("A user has disconnected, current count of user = ", global.userClients.size);
    });
};
  
module.exports = userRoute