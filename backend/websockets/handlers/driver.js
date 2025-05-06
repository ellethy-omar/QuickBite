const Driver = require('../../models/Driver')
const { chatWithAI } = require('../../services/aiAgent');


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