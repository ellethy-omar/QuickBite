// wsUtils.js
const WebSocket = require('ws'); // if you need the OPEN constant

/**
 * Send a typed payload over WS to a single client.
 *
 * @param {'admin'|'user'|'driver'|'restaurant'} role
 * @param {string|ObjectId} clientId    The target user/driver/admin id
 * @param {string} type                 The "type" field in your WS protocol
 * @param {any} data                    The payload
 * @returns {boolean} true if delivered, false if no socket or error
 */
function sendWSMessage(role, clientId, type, data) {
  const mapByRole = {
    admin:      global.adminClients,
    user:       global.userClients,
    driver:     global.driverClients,
    restaurant: global.restaurantClients,
  };
  const clients = mapByRole[role];
  if (!clients) {
    console.warn(`[WS] Unknown role "${role}"`);
    return false;
  }

  const idStr = clientId.toString();
  const ws    = clients.get(idStr);
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    //! not connected right now
    return false;
  }

  try {
    ws.send(JSON.stringify({ type, data }));
    return true;
  } catch (err) {
    console.log(`[WS] Failed to send to ${role}/${idStr}:`, err);
    return false;
  }
}

module.exports = { sendWSMessage };
