const Admin = require('../../models/Admin');

const adminRoutes  = (ws, adminPayload) => {
    global.adminClients.set(adminPayload._id.toString(), ws);
    ws.send(JSON.stringify({ type: 'connection', data: 'Admin connected' }));
    console.log("Admin connected, current count of admins = ", global.adminClients.size);

    ws.on('message', raw => {
      const { type } = JSON.parse(raw);
      // you can implement ping/pong or admin‑initiated queries here
      if (type !== 'ping') {
        console.log('Admin WS got unknown type', type);
      }
    });
  
    ws.on('close', () => {
      global.adminClients.delete(adminPayload._id.toString());
      console.log("An admin has disconnected, current count of admins = ", global.adminClients.size);
    });
};


module.exports = adminRoutes;
  