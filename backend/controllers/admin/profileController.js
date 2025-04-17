
const Admin = require('../../models/Driver')

const getAdminProfile = async (req, res) => {
    const admin = Admin.findById(req.user._id);

    res.status(200).json({admin});
}

const updateAdminProfile = async (req, res) => {
    const admin = Admin.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const updateAdminProfilePhoto = async (req, res) => {
    const admin = Admin.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const restAdminPassword = async (req, res) => {
    const admin = Admin.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    getAdminProfile,
    updateAdminProfile,
    updateAdminProfilePhoto,
    restAdminPassword
}
