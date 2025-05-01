const jwt = require("jsonwebtoken");
require('dotenv').config();

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(' ')[1]; // Extract token after 'Bearer'

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("user:", req.user);

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(420).json({ error: "Invalid or expired token" });
    }
};

const requireRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        console.log("Access denied, invalid role");
        return res.status(469).json({ error: "Access denied, you don't have the authority to do this!" });
    }
    next();
};

const checkForBan = async (req, res, next) => {
    switch (req.user.role) {
        case "user":
            const User = require('../models/User');
            const user = User.findById(req.user._id)
            if(!user)
                return res.status(404).json({ error: "User not found" });
            if (user.isBanned) {
                return res.status(420).json({ error: "User is banned" });
            }
            break;
        case "restaurant":
            const Restaurant = require('../models/Restaurant');
            const restaurant = Restaurant.findById(req.user._id)
            if(!restaurant)
                return res.status(404).json({ error: "Restaurant not found" });
            if (restaurant.isBanned) {
                return res.status(420).json({ error: "Restaurant is banned" });
            }
            break;
        case "driver":
            const Driver = require('../models/Driver');
            const driver = Driver.findById(req.user._id)
            if(!driver)
                return res.status(404).json({ error: "Driver not found" });
            if (driver.isBanned) {
                return res.status(420).json({ error: "Driver is banned" });
            }
            break;
        default:
    }
    next();
}

// Generate JWT with OTP
function generateToken(_id, role) {
    if(
        role === "user" ||
        role === "restaurant" ||
        role === "driver" ||
        role === "admin"
    )
        return jwt.sign({ _id , role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    else
        throw new Error("Invalid role");
}

module.exports = {
    requireAuth,
    requireRole,
    generateToken,
    checkForBan
};
