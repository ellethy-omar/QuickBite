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
        console.log(req.user);
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

const requireRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(469).json({ error: "Access denied, you don't have the authority to do this!" });
    }
    next();
};

// Generate JWT with OTP
function generateToken(_id, role) {
    if(
        role === "user" ||
        role === "restaurant" ||
        role === "driver" ||
        role === "admin"
    )
        return jwt.sign({ _id , role }, process.env.JWT_SECRET, { expiresIn: "3d" });
    else
        throw new Error("Invalid role");
}

module.exports = {
    requireAuth,
    requireRole,
    generateToken
};
