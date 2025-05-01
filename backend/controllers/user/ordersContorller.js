const Order = require('../../models/Order')
const Restaurant = require('../../models/Restaurant')
const Product = require('../../models/Product')

const createOrder = async (req, res) => {
    try {
      const { restaurantID, items } = req.body;
      const userID = req.user._id;

      req.body.userID = userID;

      req.body.deliveryDriverID = null;

      if ( !restaurantID || !items || !Array.isArray(items) || items.length === 0) {
        console.log("Missing required fields or empty items list.");
        return res.status(403).json({ error: 'Missing required order fields or empty items list.' });
      }
  
      const restaurant = await Restaurant.findById(restaurantID);
      if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' });
  
      const newOrder = await Order.createOrder(req.body)
  
      res.status(201).json(newOrder);

      console.log('newOrder:', newOrder);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const updateOrder = async (req, res) => {
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const cancelOrder = async (req, res) => {
    const { orderID } = req.query;

    if (!orderID) {
        console.log("Order ID is required");
        return res.status(403).json({ error: 'Order ID is required' });
    }

    try {
        await Order.findByIdAndUpdate(orderID, { status: 'cancelled' }, { new: true });
        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error("Order cancellation error:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getAllRestaurants  = async (req, res) => {
    const restaurants = await Restaurant.find({})
    if (!restaurants) {
        console.log("No restaurants found");
        return res.status(404).json({
            message: "No restaurants found",
            data: []
        });
    }

    res.status(200).json({
        message: "All restaurants fetched successfully",
        data: restaurants
    });
    console.log('restaurants:', restaurants);
}

const getProductsForRestaurant = async (req, res) => {
    const { restraurantID } = req.query;

    if(!restraurantID) {
        console.log("Restaurant ID is required");
        return res.status(403).json({ error: 'Restaurant ID is required' });
    }

    const restaurant = await Restaurant.findById(restraurantID);
    if (!restaurant) {
      console.log("Invalid restaurant _id");
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    console.log('restaurant:', restaurant);

    const products = await Product.find({ restaurantId: restraurantID });
    if (!products) {
        console.log("No products found for this restaurant");
        return res.status(404).json({
            message: "No products found for this restaurant",
            data: []
        });
    }

    res.status(200).json({
        message: "All products fetched successfully",
        data: products
    });
    console.log('products:', products);
}

module.exports = {
    createOrder,
    updateOrder,
    cancelOrder,
    getAllRestaurants,
    getProductsForRestaurant
}