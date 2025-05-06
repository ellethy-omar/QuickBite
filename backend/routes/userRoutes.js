const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getUserProfile,
    updateUserProfile,
    updateUserProfilePhoto
} = require('../controllers/user/profileController');

const {
    createOrder,
    updateOrder,
    cancelOrder,
    getMyOrders,
    getMyCurrentOrder,
    getAllRestaurants,
    getProductsForRestaurant
} = require('../controllers/user/ordersContorller');

// profile routes
router.get("/getUserProfile", getUserProfile);
router.put("/updateUserProfile", updateUserProfile);
router.put("/updateUserProfilePhoto", updateUserProfilePhoto)

// order routes
router.post("/createOrder", createOrder);
router.get("/getMyOrders", getMyOrders);
router.get("/getMyCurrentOrder", getMyCurrentOrder);
router.put("/updateOrder", updateOrder);
router.put("/cancelOrder", cancelOrder);
router.get("/getAllRestaurants", getAllRestaurants);
router.get("/getProductsForRestaurant", getProductsForRestaurant);

module.exports = router;