const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getRestaurantProfie,
    updateRestaurantProfile,
    updateRestaurantLogo,
    updateRestaurantCoverImage
} = require('../controllers/restaurant/profileContorller');

const { getMyrequests, getNotifications, sendRequest } = require('../controllers/notificationsRequestsContorller')

const {
    getRestaurantProducts,
    addRestaurantProduct,
    editRestaurantProduct,
    editRestaurantProductImage
} = require('../controllers/restaurant/menuController')

const {
    getRestaurantAllCalledOrders,
    getRestaurantAllRequiredOrders,
    acceptOrder,
    rejectOrder,
    getOrdersHistory
} = require('../controllers/restaurant/ordersContorller')

// profile routes
router.get("/getRestaurantProfie", getRestaurantProfie);
router.put("/updateRestaurantProfile", updateRestaurantProfile);
router.put("/updateRestaurantLogo", updateRestaurantLogo)
router.put("/updateRestaurantCoverImage", updateRestaurantCoverImage)

// requests/notifications routes
router.get('/getMyrequests', getMyrequests)
router.get('/getNotifications', getNotifications)
router.post('/sendRequest', sendRequest)


// menu routes
router.get("/getRestaurantProducts", getRestaurantProducts)
router.post("/addRestaurantProduct", addRestaurantProduct)
router.put("/editRestaurantProduct", editRestaurantProduct)
router.put("/editRestaurantProductImage", editRestaurantProductImage)

// order routes
router.get("/getRestaurantAllRequiredOrders", getRestaurantAllRequiredOrders);
router.get("/getRestaurantAllCalledOrders", getRestaurantAllCalledOrders);
router.put('/acceptOrder', acceptOrder)
router.put('/rejectOrder', rejectOrder)
router.get('/getOrdersHistory', getOrdersHistory)

module.exports = router;