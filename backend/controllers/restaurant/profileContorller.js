const Restaurant = require('../../models/Restaurant');

const getRestaurantProfie = async (req ,res) => {
    const restaurant = Restaurant.findById(req.user._id);

    res.status(200).json({
        restaurant
    });
    console.log('restaurant:', restaurant);
}

const updateRestaurantProfile = async (req ,res) => {
    const restaurant = Restaurant.findById(req.user._id);
    
    res.status(505).json({
        errror: "Not implmented yet"
    });
}

const updateRestaurantProfilePhoto = async (req, res) => {
    const restaurant = Restaurant.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const resetRestaurantPassword = async (req, res) => {
    const restaurant = Restaurant.findById(req.user._id);

    res.status(505).json({
        errror: "Not implmented yet"
    });
}

module.exports = {
    getRestaurantProfie,
    updateRestaurantProfile,
    updateRestaurantProfilePhoto,
    resetRestaurantPassword
}