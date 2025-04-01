const router = require('express').Router();
const { requireAuth } = require('../middleware/requireAuth');

const authRoutes = require('./authRoutes');
const cloudinaryRoutes = require('./cloudinaryRoutes');

router.get("/", (req, res)=> {
    res.status(200).json(result = {
        statusbar: false,
        failure: "Task failed Succuessfiily! this is an invalid route"
    })
});

router.use('/auth', authRoutes);
router.use('/cloudinary', cloudinaryRoutes);
router.use(requireAuth);
// Rest of routes go here

module.exports = router;