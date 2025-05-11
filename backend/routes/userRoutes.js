const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getUserProfile,
    updateUserProfile,
    updateUserProfilePhoto
} = require('../controllers/user/profileController');

const { getMyrequests, getNotifications, sendRequest } = require('../controllers/notificationsRequestsContorller')

const {
    createOrder,
    updateOrder,
    cancelOrder,
    getMyOrders,
    getMyCurrentOrder,
    getAllRestaurants,
    getProductsForRestaurant
} = require('../controllers/user/ordersContorller');

const {
    rateDriver,
    rateRestaurant,
    rateProduct
} = require('../controllers/user/ratingController');

const {
    getActiveChatsUser,
    getMessagesUser,
    getAllChatsUser
} = require('../controllers/user/chatController');


// profile routes
router.get("/getUserProfile", getUserProfile);
router.put("/updateUserProfile", updateUserProfile);
router.put("/updateUserProfilePhoto", updateUserProfilePhoto)

// requests/notifications routes
router.get('/getMyrequests', getMyrequests)
router.get('/getNotifications', getNotifications)
router.post('/sendRequest', sendRequest)

// order routes
router.post("/createOrder", createOrder);
router.get("/getMyOrders", getMyOrders);
router.get("/getMyCurrentOrder", getMyCurrentOrder);
router.put("/updateOrder", updateOrder);
router.put("/cancelOrder", cancelOrder);
router.get("/getAllRestaurants", getAllRestaurants);
router.get("/getProductsForRestaurant", getProductsForRestaurant);

// chat routes
router.get("/getActiveChatsUser", getActiveChatsUser);
router.get("/getMessagesUser", getMessagesUser);
router.get("/getAllChatsUser", getAllChatsUser);

// rating routes
router.put("/rateDriver", rateDriver);
router.put("/rateRestaurant", rateRestaurant);
router.put("/rateProduct", rateProduct);

module.exports = router;