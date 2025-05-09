const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getRestaurantProfie,
    updateRestaurantProfile,
    updateRestaurantLogo,
    updateRestaurantCoverImage
} = require('../controllers/restaurant/profileContorller');

const {
    getRestaurantProducts,
    addRestaurantProduct,
    editRestaurantProduct,
    editRestaurantProductImage
} = require('../controllers/restaurant/menuController')

const {
    getRestaurantAllRequiredOrders,
    getRestaurantAllOrders
} = require('../controllers/restaurant/ordersContorller')

// profile routes
router.get("/getRestaurantProfie", getRestaurantProfie);
router.put("/updateRestaurantProfile", updateRestaurantProfile);
router.put("/updateRestaurantLogo", updateRestaurantLogo)
router.put("/updateRestaurantCoverImage", updateRestaurantCoverImage)

// menu routes
router.get("/getRestaurantProducts", getRestaurantProducts)
router.post("/addRestaurantProduct", addRestaurantProduct)
router.put("/editRestaurantProduct", editRestaurantProduct)
router.put("/editRestaurantProductImage", editRestaurantProductImage)

// order routes
router.get("/getRestaurantAllRequiredOrders", getRestaurantAllRequiredOrders);
router.get("/getRestaurantAllOrders", getRestaurantAllOrders);

module.exports = router;