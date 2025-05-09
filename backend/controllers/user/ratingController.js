const Driver = require('../../models/Driver');
const Restaurant = require('../../models/Restaurant');
const Product = require('../../models/Product');

const rateDriver = async (req, res) => {
    const { driverId, rating } = req.body;
    if(!driverId || !rating) {
        console.log("Driver ID & rating are required");
        return res.status(403).json({ error: 'Driver ID & rating are required' });
    }

    if(isNaN(rating) || rating < 0 || rating > 5) {
        console.log("Invalid rating value");
        return res.status(403).json({ error: 'Invalid rating value' });
    }

    try {
        const driver = await Driver.findById(driverId);

        if(!driver)
            return res.status(404).json({ error: 'Driver not found.' });
    
        await driver.updateRating(rating);

        res.status(200).json({
            message: "Driver rated successfully",
            newRating: driver.rating,
            totalRatings: driver.ratingCount,
        });
    } catch (error) {
        console.log("Error while rating driver:", error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
        
    }
}

const rateRestaurant = async (req, res) => {
    const { restaurantId, rating } = req.body;
    if(!restaurantId || !rating) {
        console.log("Restaurant ID & rating are required");
        return res.status(403).json({ error: 'Restaurant ID & rating are required' });
    }

    if(isNaN(rating) || rating < 0 || rating > 5) {
        console.log("Invalid rating value");
        return res.status(403).json({ error: 'Invalid rating value' });
    }

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant)
            return res.status(404).json({ error: 'Restaurant not found.' });
    
        await restaurant.updateRating(rating);

        res.status(200).json({
            message: "Restaurant rated successfully",
            newRating: restaurant.rating,
            totalRatings: restaurant.ratingCount,
        });
    } catch (error) {
        console.log("Error while rating restaurant:", error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
        
    }
}

const rateProduct = async (req, res) => {
    const { productId, rating } = req.body;
    if(!rating || !productId) {
        console.log("Product ID & rating are required");
        return res.status(403).json({ error: 'Product ID & rating are required' });
    }

    if(isNaN(rating) || rating < 0 || rating > 5) {
        console.log("Invalid rating value");
        return res.status(403).json({ error: 'Invalid rating value' });
    }

    try {
        const product = await Product.findById(productId);

        if(!product)
            return res.status(404).json({ error: 'Product not found.' });
    
        await product.updateRating(rating);

        res.status(200).json({
            message: "Product rated successfully",
            newRating: product.rating,
            totalRatings: product.ratingCount,
        });
    } catch (error) {
        console.log("Error while rating product:", error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
        
    }
}


module.exports = {
    rateDriver,
    rateRestaurant,
    rateProduct
}