const Driver = require('../../models/Driver')

const getDriverProfile = async (req, res) => {
    const driver = Driver.findById(req.user._id);

    res.status(200).json({driver});
    console.log('driver:', driver);
}

const updateDriverProfile = async (req, res) => {
    const driver = Driver.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const updateDriverProfilePhoto = async (req, res) => {
    const driver = Driver.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const restDriverPassword = async (req, res) => {
    const driver = Driver.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    getDriverProfile,
    updateDriverProfile,
    updateDriverProfilePhoto,
    restDriverPassword
}
