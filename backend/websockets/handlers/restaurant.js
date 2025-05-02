const Order = require('../../models/Order');
const Restaurant = require('../../models/Restaurant');

const restaurantRoutes = (ws, restPayload) => {
    global.restaurantClients.set(restPayload._id.toString(), ws);
    ws.send(JSON.stringify({ type: 'connection', data: 'Restaurant connected' }));
    console.log("Restaurant connected, current count of restaurant = ", global.restaurantClients.size);
  
    ws.on('message', async raw => {
      const { type, data } = JSON.parse(raw);
      switch (type) {
        case 'respondOrder': {
          // data = { orderId, accept: true|false, userId }
          await Order.findByIdAndUpdate(data.orderId, {
            status: data.accept ? 'accepted' : 'denied',
            restaurantId: restPayload._id
          });
          // notify user of the restaurant’s decision
          global.userClients.get(data.userId)
            ?.send(JSON.stringify({ type: 'orderResponse', data }));
          break;
        }
        default:
          console.log('Restaurant WS got unknown type', type);
      }
    });
  
    ws.on('close', () => {
      global.restaurantClients.delete(restPayload._id.toString());
      console.log("A restaurant has disconnected, current count of restaurant = ", global.restaurantClients.size);
    });
};
  

module.exports = restaurantRoutes;