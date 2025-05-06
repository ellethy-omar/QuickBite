const Admin = require('../../models/Admin');
const { chatWithAI } = require('../../services/aiAgent');


const adminRoutes  = async (ws, adminPayload) => {
    global.adminClients.set(adminPayload._id.toString(), ws);
    ws.send(JSON.stringify({ type: 'connection', data: 'Admin connected' }));
    console.log("Admin connected, current count of admins = ", global.adminClients.size);

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
        case 'ping': {
          ws.send(JSON.stringify({ type: 'pong', data: 'pong' }));
          break;
        }
        case 'ai':
          try {


            const aiResponse = await chatWithAI(data.prompt);
        
            ws.send(JSON.stringify({
              type: 'ai_response',
              data: aiResponse
            }));
          } catch (err) {
            console.log('Error in AI handler:', err.response?.data || err.message);
            ws.send(JSON.stringify({
              type: 'error',
              data: `AI service error: ${err.message}`
            }));
          }
        break;
        default: {
          console.log('Admin WS got unknown type', type);
          ws.send(JSON.stringify({
            type: 'error',
            data: 'Unhandled type'
          }));
        }
      }
    });
  
    ws.on('close', () => {
      global.adminClients.delete(adminPayload._id.toString());
      console.log("An admin has disconnected, current count of admins = ", global.adminClients.size);
    });
};


module.exports = adminRoutes;
  