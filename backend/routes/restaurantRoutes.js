const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getRestaurantProfie,
    updateRestaurantProfile,
    updateRestaurantProfilePhoto,
    resetRestaurantPassword
} = require('../controllers/restaurant/profileContorller');

const {
    getRestaurantProducts,
    addRestaurantProduct,
    editRestaurantProduct
} = require('../controllers/restaurant/menuController')

// profile routes
router.get("/getRestaurantProfie", getRestaurantProfie);
router.put("/updateRestaurantProfile", updateRestaurantProfile);
router.put("/updateRestaurantProfilePhoto", updateRestaurantProfilePhoto)
router.post("/resetRestaurantPassword", resetRestaurantPassword)

// menu routes
router.get("/getRestaurantProducts", getRestaurantProducts)
router.post("/addRestaurantProduct", addRestaurantProduct)
router.put("/editRestaurantProduct", editRestaurantProduct)

module.exports = router;