const Message = require('../../models/Message');
const User = require('../../models/User');
const { chatWithAI } = require('../../services/aiAgent');

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
      switch (type) {
        case 'chat':
          break;
        case 'ai':
          try {
            const aiResponse = await chatWithAI(data.prompt);
        
            ws.send(JSON.stringify({
              type: 'ai_response',
              data: aiResponse
            }));
          } catch (err) {
            console.error('Error in AI handler:', err.response?.data || err.message);
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