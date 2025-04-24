const Order = require('../../models/Order')
const Restaurant = require('../../models/Restaurant')
const Product = require('../../models/Product')

const createOrder = async (req, res) => {
    try {
      const { restaurantID, items } = req.body;
      const userID = req.user._id;

      if ( !restaurantID || !items || !Array.isArray(items) || items.length === 0) {
        console.log("Missing required fields or empty items list.");
        return res.status(403).json({ error: 'Missing required order fields or empty items list.' });
      }
  
      const restaurant = await Restaurant.findById(restaurantID);
      if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' });
  
      let totalAmount = 0;
      for (let item of items) {
        const product = await Product.findById(item.productId);
        if (!product || product.restraurantID.toString() !== restaurantID) {

          console.log("Product not found");
          return res.status(400).json({ 
            error: `Product ${item.productId} not found or doesn't belong to the specified restaurant.` 
          });
        }
        totalAmount += product.price * item.quantity;
      }
  
      const newOrder = await Order.create({
        userID,
        restaurantID,
        items,
        totalAmount
      });
  
      const populatedOrder = await Order.findById(newOrder._id)
        .populate('restaurantID', 'name')
        .populate('userID', 'name phone')
        .populate('items.productId', 'name price');
  
      return res.status(201).json(populatedOrder);
    } catch (error) {
      console.error("Order creation error:", error);
      return res.status(500).json({ error: 'Internal server error', details: error });
    }
};

const updateOrder = async (req, res) => {
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const cancelOrder = async (req, res) => {
    res.status(505).json({
        errror: "Not implmented yet"
    })
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

    const products = await Product.find({ restraurantID });
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