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
  
// Ban a user by setting isBanned = true
const banUser = async (req, res) => { 
    try {
        const { userId } = req.query;

        if (!userId) {
            console.log('Order ID is required.');
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const user = await User.findById(userId);

      if (!user) return res.status(404).json({ error: 'User not found.' })
  
      user.isBanned = true
      await user.save()
  
      res.json({ message: 'User has been banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning user.' })
    }
}
  
// Ban a restaurant
const banRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        if (!restaurantId) {
            console.log('Order ID is required.');
            return res.status(400).json({ error: 'Order ID is required' });
        }

      const restaurant = await Restaurant.findById(restaurantId)
      if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' })
  
      restaurant.isBanned = true
      await restaurant.save()
  
      res.json({ message: 'Restaurant has been banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning restaurant.' })
    }
}
  
// Ban a driver
const banDriver = async (req, res) => {
    try {
        const { driverId } = req.query;

        if (!driverId) {
            console.log('Order ID is required.');
            return res.status(400).json({ error: 'Order ID is required' });
        }

      const driver = await Driver.findById(driverId)
      if (!driver) return res.status(404).json({ error: 'Driver not found.' })
  
      driver.isBanned = true
      await driver.save()
  
      res.json({ message: 'Driver has been banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning driver.' })
    }
}
  
// Unban a user
const unBanUser = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            console.log('Order ID is required.');
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const user = await User.findById(userId);

      if (!user) return res.status(404).json({ error: 'User not found.' })
  
      user.isBanned = false
      await user.save()
  
      res.json({ message: 'User has been banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning user.' })
    }
}
  
// Unban a driver
const unBanDriver = async (req, res) => {
    try {
        const { driverId } = req.query;

        if (!driverId) {
            console.log('Order ID is required.');
            return res.status(400).json({ error: 'Order ID is required' });
        }

      const driver = await Driver.findById(driverId)
      if (!driver) return res.status(404).json({ error: 'Driver not found.' })
  
      driver.isBanned = false
      await driver.save()
  
      res.json({ message: 'Driver has been banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning driver.' })
    }
}
  
// Unban a restaurant
const unBanRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        if (!restaurantId) {
            console.log('Order ID is required.');
            return res.status(400).json({ error: 'Order ID is required' });
        }

      const restaurant = await Restaurant.findById(restaurantId)
      if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' })
  
      restaurant.isBanned = false
      await restaurant.save()
  
      res.json({ message: 'Restaurant has been banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning restaurant.' })
    }
}
  
// Send a warning to a user
// Insight: consider adding a `warnings` array or `warningCount` to your schema
// and implementing notifications (email, SMS, in-app) as needed.
const sendWarningToUser = async (req, res) => {
    try {
    const { message, userId } = req.body
        
        if (!message || !userId) {
            console.log('Message and user ID are required.');
            return res.status(403).json({ error: 'Message and user ID are required' });
        }
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    // Example: push to a warnings array
    // user.warnings.push({ message, date: new Date() })
    // await user.save()

    res.json({ message: 'Warning sent to user.', warning: message })
    } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error while sending warning.' })
    }
}

// Send a warning to a driver
const sendWarningToDriver = async (req, res) => {
    try {
    const { message, driverId } = req.body
        if (!message || !driverId) {
            console.log('Message and driver ID are required.');
            return res.status(403).json({ error: 'Message and driver ID are required' });
        }
    const driver = await Driver.findById(req.params.id)
    if (!driver) return res.status(404).json({ error: 'Driver not found.' })

    // driver.warnings.push({ message, date: new Date() })
    // await driver.save()

    res.json({ message: 'Warning sent to driver.', warning: message })
    } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error while sending warning.' })
    }
}

// Send a warning to a restaurant
const sendWarningToRestaurant = async (req, res) => {
    try {
    const { message, restaurantId } = req.body
        if (!message || !restaurantId) {
            console.log('Message and restaurant ID are required.');
            return res.status(403).json({ error: 'Message and restaurant ID are required' });
        }

    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' })

    // restaurant.warnings.push({ message, date: new Date() })
    // await restaurant.save()

    res.json({ message: 'Warning sent to restaurant.', warning: message })
    } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error while sending warning.' })
    }
}

module.exports = {
    getAllUsers,
    getAllDrivers,
    getAllRestaurants,
    banUser,
    banDriver,
    banRestaurant,
    unBanUser,
    unBanDriver,
    unBanRestaurant,
    sendWarningToUser,
    sendWarningToDriver,
    sendWarningToRestaurant
}