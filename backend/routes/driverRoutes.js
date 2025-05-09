const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getDriverProfile,
    updateDriverProfile,
    updateDriverProfilePhoto
} = require('../controllers/driver/profileController');

const {
    getAllAvailableOrders,
    acceptOrder,
    leaveOrder,
    getTheOrderIneedToDeliver,
    getMyOrdersHistory,
    getActiveChatsDriver,
    getMessagesDriver
} = require('../controllers/driver/deliveryController');

// profile routes
router.get("/getDriverProfile", getDriverProfile);
router.put("/updateDriverProfile", updateDriverProfile);
router.put("/updateDriverProfilePhoto", updateDriverProfilePhoto)

// delivery routes
router.get("/getAllAvailableOrders", getAllAvailableOrders);
router.put("/acceptOrder", acceptOrder);
router.put("/leaveOrder", leaveOrder);
router.get("/getTheOrderIneedToDeliver", getTheOrderIneedToDeliver);
router.get("/getActiveChatsDriver", getActiveChatsDriver);
router.get("/getMessagesDriver", getMessagesDriver);
router.get("/getMyOrdersHistory", getMyOrdersHistory);

module.exports = router;