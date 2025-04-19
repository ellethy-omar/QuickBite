const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getAdminProfile,
    updateAdminProfile,
    updateAdminProfilePhoto,
    restAdminPassword
} = require('../controllers/admin/profileController');

const {
    sendwarningToUser,
    banUser,
    unBanUser,
    sendWarningToDriver,
    banDriver,
    unBanDriver,
    sendWarningToRestaurant,
    banRestaurant,
    unBanRestaurant,   
} = require('../controllers/admin/dashboardController')

// profile routes
router.get("/getAdminProfile", getAdminProfile);
router.put("/updateAdminProfile", updateAdminProfile);
router.put("/updateAdminProfilePhoto", updateAdminProfilePhoto)
router.post("/restAdminPassword", restAdminPassword)


// dashboard routes
router.post('/sendwarningToUser', sendwarningToUser);
router.post('/sendWarningToDriver', sendWarningToDriver)
router.post('/sendWarningToRestaurant', sendWarningToRestaurant)

router.put('/banUser', banUser)
router.put('/banDriver', banDriver)
router.put('/banRestaurant', banRestaurant)

router.put('/unBanUser', unBanUser)
router.put('/unBanDriver', unBanDriver)
router.put('/unBanRestaurant', unBanRestaurant)

module.exports = router;