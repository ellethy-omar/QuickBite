const Restaurant = require('../../models/Restaurant');
const Product = require('../../models/Product');

const getRestaurantProducts = async (req, res) => {
    const restaurant = Restaurant.findbyId(req.user._id);

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const addRestaurantProduct = async (req, res) => {
    const { product } = req.body;

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const editRestaurantProduct = async (req, res) => {
    const { product } = req.body;

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    getRestaurantProducts,
    addRestaurantProduct,
    editRestaurantProduct
}