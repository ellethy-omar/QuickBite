const Message = require('../../models/Message');
const User = require('../../models/User');

const userRoute = (ws, userPayload) => {
    global.userClients.set(userPayload._id.toString(), ws);
    ws.send(JSON.stringify({ type: 'connection', data: 'User connected' }));
    console.log("User connected, current count of user = ", global.userClients.size);

    ws.on('message', async raw => {
      const { type, data } = JSON.parse(raw);
      switch (type) {
        case 'chat': {
          // const targetMap = {
          //   driver:   global.driverClients,
          //   restaurant: global.restaurantClients,
          //   admin:    global.adminClients
          // }[data.toRole];
          // targetMap?.get(data.toId)
          //   ?.send(JSON.stringify({ type: 'chat', data }));
          break;
        }
        default:
          console.log('User WS got unknown type', type);
          ws.send(JSON.stringify({
            type: 'error',
            data: 'Invalid type'
          }));
      }
    });
  
    ws.on('close', () => {
      global.userClients.delete(userPayload._id.toString());
      console.log("A user has disconnected, current count of user = ", global.userClients.size);
    });
};
  
module.exports = userRoute