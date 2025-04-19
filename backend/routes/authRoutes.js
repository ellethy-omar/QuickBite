const router = require('express').Router(); // require express and use the Router method to create a router object
const { 
    registerUser, 
    loginUser,
    registerDriver,
    loginDriver,
    registerAdmin,
    loginAdmin,
    registerRestaurant,
    loginRestaurant,
    verifyToken
} = require('../controllers/authController');
const { requireAuth } = require('../middleware/requireAuth');

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

router.post('/registerDriver', registerDriver);
router.post('/loginDriver', loginDriver);   

router.post('/registerAdmin', registerAdmin);
router.post('/loginAdmin', loginAdmin);

router.post('/registerRestaurant', registerRestaurant);
router.post('/loginRestaurant', loginRestaurant);

router.get('/verify', requireAuth, verifyToken);

module.exports = router;