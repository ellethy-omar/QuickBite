const routesIntegrator = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/requireAuth');

const authRoutes = require('./authRoutes');
const cloudinaryRoutes = require('./cloudinaryRoutes');
const adminRoutes = require("./adminRoutes");
const driverRoutes = require("./driverRoutes");
const restaurantRoutes = require("./restaurantRoutes");
const userRoutes = require("./userRoutes");

routesIntegrator.get("/", (req, res)=> {
    res.status(404).json(result = {
        statusbar: false,
        failure: "Task failed Succuessfiily! this is an invalid route"
    })
});

routesIntegrator.use('/auth', authRoutes);
routesIntegrator.use('/cloudinary', cloudinaryRoutes);
routesIntegrator.use(requireAuth);
routesIntegrator.use('/admin', requireRole("admin"), adminRoutes);
routesIntegrator.use('/driver', requireRole("driver"), driverRoutes);
routesIntegrator.use('/restaurant', requireRole("restaurant"), restaurantRoutes);
routesIntegrator.use('/user', requireRole("user"), userRoutes);

module.exports = routesIntegrator;