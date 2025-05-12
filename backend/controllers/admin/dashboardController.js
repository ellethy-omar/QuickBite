const Admin = require('../../models/Admin')
const Driver = require('../../models/Driver')
const Restaurant = require('../../models/Restaurant')
const User = require('../../models/User')
const Order = require('../../models/Order')
const Product = require('../../models/Product')

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while fetching users.' })
    }
}
  
// Fetch all drivers
const getAllDrivers = async (req, res) => {
    try {
      const drivers = await Driver.find()
      res.json(drivers)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while fetching drivers.' })
    }
}
  
  // Fetch all restaurants
const getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find()
      res.json(restaurants)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while fetching restaurants.' })
    }
}

const getAllProductsOfCertainRestaurant = async (req, res) => {
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
          return res.status(200).json({
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

const getAllOrdersForCetainUser = async (req, res) => {
    const { userId } = req.query;

    if(!userId) {
        console.log("userId is required")
        return res.status(403).json({ error: "userId is required"})
    }

    const user = User.findById(userId);

    if(!user) {
        console.log("User not found")
        return res.status(403).json({ error: "User not found"})        
    }
        
    try {
        const orders = await Order.findOrdersByUserId(userId)
        res.status(200).json({
            message: "All orders fetched successfully",
            data: orders
        });
        console.log('orders:', orders);
    } catch (error) {
        console.log("Order fetching error:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });        
    }
}


const getDriverOrdersHistory = async (req, res) => {
        const { driverId } = req.query;

        if(!driverId) {
            console.log("driverId is required")
            return res.status(403).json({ error: "driverId is required"})
        }

        try {
            const orders = await Order.find({
                deliveryDriverID: driverId
            }).populate('restaurantID', 'name address logo contact.phone')
            .populate('userID', 'name phone addresses')
            .populate('items.productId', 'name price category description image');

            if(!orders) {
                console.log('You do not have any order.');
                return res.status(200).json({
                    message: 'You do not have any orders.',
                    data: orders
                });
            } else {
                console.log('Found order:', orders);
                res.status(200).json({
                    message: 'Order found.',
                    data: orders
                });
            }
        }
        catch (error) {
            console.log('Error finding order:', err);
            res.status(500).json({ error: 'Error getting the order????????? How did you reach this point?', details: err.message });        
        }
}

const getProcessingOrders = async (req, res) => {
    try {
        const orders = await Order.find({status: ['processing', 'pending']})
        .populate('restaurantID', 'name address logo contact.phone')
        .populate('userID', 'name phone addresses')
        .populate('items.productId', 'name price category description image')

        return res.status(200).json({
            data: orders
        });
    } catch (error) {
        console.log('Error finding order:', err);
        res.status(500).json({ error: 'Error getting the order????????? How did you reach this point?', details: err.message });     
    }
}

module.exports = {
    getAllUsers,
    getAllDrivers,
    getAllRestaurants,
    getAllProductsOfCertainRestaurant,
    getAllOrdersForCetainUser,
    getDriverOrdersHistory,
    getProcessingOrders
}