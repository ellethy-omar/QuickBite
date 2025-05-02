const Driver = require('../../models/Driver')

const driverRoutes = (ws, driver) => {
    global.driverClients.set(driver._id, ws);
    ws.send(JSON.stringify({ type: 'connection', data: 'Driver connected' }));
    console.log("Driver connected, current count of drivers = ", global.driverClients.size);
  
    ws.on('message', async message => {
      const { type, data } = JSON.parse(message);
      switch (type) {
        case 'locationUpdate': {
          const { orderId, latitude, longitude, userId } = data;
          // broadcast to user & admins
          global.userClients.get(userId)
            ?.send(JSON.stringify({ type: 'locationUpdate', data }));
          global.adminClients.forEach(sock =>
            sock.send(JSON.stringify({ type: 'locationUpdate', data }))
          );
          break;
        }
        case 'acceptOrder': {
          const { orderId, userId } = data;
          // notify the user only
          global.userClients.get(userId)
            ?.send(JSON.stringify({ type: 'orderAccepted', data }));
          break;
        }
        // …you can add chat, status updates, etc.
        default:
          console.log('Driver WS got unknown type', type);
      }
    });
  
    ws.on('close', () => {
      global.driverClients.delete(driver._id);
      console.log("A driver has disconnected, current count of drivers = ", global.driverClients.size);
    });
};
  

module.exports = driverRoutes;