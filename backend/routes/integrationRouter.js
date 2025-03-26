const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/requireAuth');

const authRoutes = require('./authRoutes');

router.get("/", (req, res)=> {
    res.status(200).json(result = {
        statusbar: false,
        failure: "Task failed Succuessfiily! this is an invalid route"
    })
});

router.use('/auth', authRoutes);
router.use(requireAuth);
// Rest of routes go here

module.exports = router;