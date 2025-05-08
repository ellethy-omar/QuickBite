const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getRestaurantProfie,
    updateRestaurantProfile,
    updateRestaurantLogo,
    updateRestaurantCoverImage,
    resetRestaurantPassword
} = require('../controllers/restaurant/profileContorller');

const {
    getRestaurantProducts,
    addRestaurantProduct,
    editRestaurantProduct,
    editRestaurantProductImage,
    getRestaurantAllRequiredOrders,
    getRestaurantAllOrders
} = require('../controllers/restaurant/menuController')

// profile routes
router.get("/getRestaurantProfie", getRestaurantProfie);
router.put("/updateRestaurantProfile", updateRestaurantProfile);
router.put("/updateRestaurantLogo", updateRestaurantLogo)
router.put("/updateRestaurantCoverImage", updateRestaurantCoverImage)
router.post("/resetRestaurantPassword", resetRestaurantPassword)

// menu routes
router.get("/getRestaurantProducts", getRestaurantProducts)
router.post("/addRestaurantProduct", addRestaurantProduct)
router.put("/editRestaurantProduct", editRestaurantProduct)
router.put("/editRestaurantProductImage", editRestaurantProductImage)

// order routes
router.get("/getRestaurantAllRequiredOrders", getRestaurantAllRequiredOrders);
router.get("/getRestaurantAllOrders", getRestaurantAllOrders);

module.exports = router;