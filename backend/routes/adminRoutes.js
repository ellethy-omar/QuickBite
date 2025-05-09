const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getAdminProfile,
    updateAdminProfile,
    updateAdminProfilePhoto
} = require('../controllers/admin/profileController');

const {
    getAllUsers,
    getAllDrivers,
    getAllRestaurants,
    banUser,
    banDriver,
    banRestaurant,
    unBanUser,
    unBanDriver,
    unBanRestaurant,
    sendWarningToUser,
    sendWarningToDriver,
    sendWarningToRestaurant
} = require('../controllers/admin/dashboardController')

// profile routes
router.get("/getAdminProfile", getAdminProfile);
router.put("/updateAdminProfile", updateAdminProfile);
router.put("/updateAdminProfilePhoto", updateAdminProfilePhoto)

// dashboard routes
router.get('/getAllUsers', getAllUsers);
router.get('/getAllDrivers', getAllDrivers);
router.get('/getAllRestaurants', getAllRestaurants);

router.post('/sendWarningToUser', sendWarningToUser);
router.post('/sendWarningToDriver', sendWarningToDriver)
router.post('/sendWarningToRestaurant', sendWarningToRestaurant)

router.put('/banUser', banUser)
router.put('/banDriver', banDriver)
router.put('/banRestaurant', banRestaurant)

router.put('/unBanUser', unBanUser)
router.put('/unBanDriver', unBanDriver)
router.put('/unBanRestaurant', unBanRestaurant)

module.exports = router;