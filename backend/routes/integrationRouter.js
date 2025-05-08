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
    // 1) Always add the CORS headers…
    res.header('Access-Control-Allow-Origin',  '*');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
  
    // 2) If it’s a preflight, short-circuit with 204
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
  
    // otherwise go on to requireAuth → your PUT handler…
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