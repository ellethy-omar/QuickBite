const jwt = require('jsonwebtoken');
const adminWs      = require('./handlers/admin');
const userWs       = require('./handlers/user');
const driverWs     = require('./handlers/driver');
const restaurantWs = require('./handlers/restaurant');

// Global maps to track sockets by user type
if(!global.adminClients)      global.adminClients      = new Map();
if(!global.userClients)       global.userClients       = new Map();
if(!global.driverClients)     global.driverClients     = new Map();
if(!global.restaurantClients) global.restaurantClients = new Map();

const WebSocketRoutes = (ws, request) => {
  const urlObj = new URL(request.url, `http://${request.headers.host}`);
  const path   = urlObj.pathname;
  const token  = urlObj.searchParams.get('token');
  if (!token) {
    console.log('No token provided, closing connection');
    return ws.close(1008, 'Auth token required');
  }
  
  let decoded;
  try { decoded = jwt.verify(token, process.env.JWT_SECRET); }
  catch (err) { return ws.close(1008, 'Invalid token'); }

  try {
    decoded.role;
  } catch (error) {
    return ws.close(1008, 'Invalid role');
  }
  
  switch (path) {
    case '/admin':
        if(decoded.role !== 'admin') {
          return ws.close(1008, 'Invalid token for admin route, closing connection');
        }
        return adminWs(ws, decoded);
    case '/user':       
        if(decoded.role !== 'user') {
          return ws.close(1008, 'Invalid token for user route, closing connection');
        }
        return userWs(ws, decoded);
    case '/driver':
        if(decoded.role !== 'driver') {
          return ws.close(1008, 'Invalid token for driver route, closing connection');
        }
        return driverWs(ws, decoded);
    case '/restaurant': 
        if(decoded.role !== 'restaurant') {
          return ws.close(1008, 'Invalid token for restaurant route, closing connection');
        }
        return restaurantWs(ws, decoded);
    default:
      return ws.close(1000, 'Unknown endpoint, closing connection');
  }
};

module.exports = WebSocketRoutes;
