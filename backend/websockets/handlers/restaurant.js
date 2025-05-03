const Order = require('../../models/Order');
const Restaurant = require('../../models/Restaurant');
const { chatWithAI } = require('../../services/aiAgent');
const restaurantRoutes = async (ws, restPayload) => {
    global.restaurantClients.set(restPayload._id.toString(), ws);
    ws.send(JSON.stringify({ type: 'connection', data: 'Restaurant connected' }));
    console.log("Restaurant connected, current count of restaurant = ", global.restaurantClients.size);
  
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
        case 'respondOrder':
          // data = { orderId, accept: true|false, userId }
          // await Order.findByIdAndUpdate(data.orderId, {
          //   status: data.accept ? 'accepted' : 'denied',
          //   restaurantId: restPayload._id
          // });
          // // notify user of the restaurant’s decision
          // global.userClients.get(data.userId)
          //   ?.send(JSON.stringify({ type: 'orderResponse', data }));
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
          console.log('Restaurant WS got unknown type', type);
          ws.send(JSON.stringify({
            type: 'error',
            data: 'Unhandled type'
          }));
      }
    });
  
    ws.on('close', () => {
      global.restaurantClients.delete(restPayload._id.toString());
      console.log("A restaurant has disconnected, current count of restaurant = ", global.restaurantClients.size);
    });
};
  

module.exports = restaurantRoutes;