const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getDriverProfile,
    updateDriverProfile,
    updateDriverProfilePhoto,
    restDriverPassword
} = require('../controllers/driver/profileController');

const {
    getAllAvailableOrders,
    acceptOrder
} = require('../controllers/driver/deliveryController');

// profile routes
router.get("/getDriverProfile", getDriverProfile);
router.put("/updateDriverProfile", updateDriverProfile);
router.put("/updateDriverProfilePhoto", updateDriverProfilePhoto)
router.post("/restDriverPassword", restDriverPassword)

// dilvery routes

router.get("/getAllAvailableOrders", getAllAvailableOrders);
router.put("/acceptOrder", acceptOrder);

module.exports = router;