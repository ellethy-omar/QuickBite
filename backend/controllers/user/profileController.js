const User = require('../../models/User');

const getUserProfile = async (req, res) => {
    const user = User.findById(req.user._id);

    res.status(200).json({user});
}

const updateUserProfile = async (req, res) => {
    const user = User.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const updateUserProfilePhoto = async (req, res) => {
    const user = User.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const restUserPassword = async (req, res) => {
    const user = User.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserProfilePhoto,
    restUserPassword
}
