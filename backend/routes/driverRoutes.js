const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getDriverProfile,
    updateDriverProfile,
    updateDriverProfilePhoto
} = require('../controllers/driver/profileController');

const { getMyrequests, getNotifications, sendRequest } = require('../controllers/notificationsRequestsContorller')

const {
    getAllAvailableOrders,
    acceptOrder,
    leaveOrder,
    getTheOrderIneedToDeliver,
    getMyOrdersHistory,
    markDeliveryAsDone
} = require('../controllers/driver/deliveryController');

const {
    getActiveChatsDriver,
    getMessagesDriver,
    getAllChatsDriver
}  = require('../controllers/driver/chatController');

// profile routes
router.get("/getDriverProfile", getDriverProfile);
router.put("/updateDriverProfile", updateDriverProfile);
router.put("/updateDriverProfilePhoto", updateDriverProfilePhoto)

// requests/notifications routes
router.get('/getMyrequests', getMyrequests)
router.get('/getNotifications', getNotifications)
router.post('/sendRequest', sendRequest)

// delivery routes
router.get("/getAllAvailableOrders", getAllAvailableOrders);
router.put("/acceptOrder", acceptOrder);
router.put("/leaveOrder", leaveOrder);
router.get("/getTheOrderIneedToDeliver", getTheOrderIneedToDeliver);
router.get("/getMyOrdersHistory", getMyOrdersHistory);
router.put("/markDeliveryAsDone", markDeliveryAsDone);

// chat routes
router.get("/getActiveChatsDriver", getActiveChatsDriver);
router.get("/getMessagesDriver", getMessagesDriver);
router.get("/getAllChatsDriver", getAllChatsDriver);

module.exports = router;