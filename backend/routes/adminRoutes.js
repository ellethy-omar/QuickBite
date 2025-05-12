const router = require('express').Router(); // require express and use the Router method to create a router object
const {
    getAdminProfile,
    updateAdminProfile,
    updateAdminProfilePhoto
} = require('../controllers/admin/profileController');

const {
    banUser,
    banDriver,
    banRestaurant,
    banProduct,
    unBanProduct,
    unBanUser,
    unBanDriver,
    unBanRestaurant
} = require('../controllers/admin/banContoller')

const {
    getAllUsers,
    getAllDrivers,
    getAllRestaurants,
    getAllProductsOfCertainRestaurant,
    getAllOrdersForCetainUser,
    getDriverOrdersHistory,
    getProcessingOrders
} = require('../controllers/admin/dashboardController')

const {
    getAllRequests,
    getRequestById,
    processDriverProfileUpdateRequest,
    processDriverProfilePhotoUpdateRequest,
    sendNotification,
    processRequest
} = require('../controllers/admin/notificationsController')

// profile routes
router.get("/getAdminProfile", getAdminProfile);
router.put("/updateAdminProfile", updateAdminProfile);
router.put("/updateAdminProfilePhoto", updateAdminProfilePhoto)

// dashboard routes
router.get('/getAllUsers', getAllUsers);
router.get('/getAllDrivers', getAllDrivers);
router.get('/getAllRestaurants', getAllRestaurants);
router.get('/getAllProductsOfCertainRestaurant', getAllProductsOfCertainRestaurant)
router.get('/getAllOrdersForCetainUser', getAllOrdersForCetainUser)
router.get('/getDriverOrdersHistory', getDriverOrdersHistory)
router.get('/getProcessingOrders', getProcessingOrders)

// ban routes
router.put('/banUser', banUser)
router.put('/banDriver', banDriver)
router.put('/banRestaurant', banRestaurant)
router.put('/banProduct', banProduct)

router.put('/unBanUser', unBanUser)
router.put('/unBanDriver', unBanDriver)
router.put('/unBanRestaurant', unBanRestaurant)
router.put('/unBanProduct', unBanProduct)

// Notifcations_Requests routes
router.get('/getAllRequests', getAllRequests)
router.get('/getRequestById', getRequestById)
router.put('/processDriverProfileUpdateRequest', processDriverProfileUpdateRequest)
router.put('/processDriverProfilePhotoUpdateRequest', processDriverProfilePhotoUpdateRequest)
router.post('/sendNotification', sendNotification);
router.put('/processRequest', processRequest)

module.exports = router;