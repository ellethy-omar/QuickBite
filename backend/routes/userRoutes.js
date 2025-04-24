const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getUserProfile,
    updateUserProfile,
    updateUserProfilePhoto,
    restUserPassword
} = require('../controllers/user/profileController');

const {
    createOrder,
    updateOrder,
    cancelOrder,
    getAllRestaurants,
    getProductsForRestaurant
} = require('../controllers/user/ordersContorller');

// profile routes
router.get("/getUserProfile", getUserProfile);
router.put("/updateUserProfile", updateUserProfile);
router.put("/updateUserProfilePhoto", updateUserProfilePhoto)
router.post("/restUserPassword", restUserPassword)

// order routes
router.post("/createOrder", createOrder);
router.put("/updateOrder", updateOrder);
router.put("/cancelOrder", cancelOrder);
router.get("/getAllRestaurants", getAllRestaurants);
router.get("/getProductsForRestaurant", getProductsForRestaurant);

module.exports = router;