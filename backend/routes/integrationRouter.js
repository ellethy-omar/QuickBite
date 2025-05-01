const routesIntegrator = require('express').Router();
const { requireAuth, requireRole, checkForBan } = require('../middleware/requireAuth');

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

// before requireAuth
routesIntegrator.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      return res
        .header('Access-Control-Allow-Origin',  '*')
        .header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
        .header('Access-Control-Allow-Headers','Content-Type,Authorization')
        .sendStatus(204);
    }
    next();
});
  

routesIntegrator.use('/auth', authRoutes);
routesIntegrator.use('/cloudinary', cloudinaryRoutes);
routesIntegrator.use(requireAuth);
routesIntegrator.use('/admin', requireRole("admin"), adminRoutes);
routesIntegrator.use(checkForBan);
routesIntegrator.use('/driver', requireRole("driver"), driverRoutes);
routesIntegrator.use('/restaurant', requireRole("restaurant"), restaurantRoutes);
routesIntegrator.use('/user', requireRole("user"), userRoutes);

module.exports = routesIntegrator;