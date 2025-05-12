const Driver = require('../../models/Driver')
const Restaurant = require('../../models/Restaurant')
const User = require('../../models/User')

const banUser = async (req, res) => { 
    try {
        const { userId } = req.query;

        if (!userId) {
            console.log('Order ID is required.');
            return res.status(403).json({ error: 'Order ID is required' });
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
  
const banRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        if (!restaurantId) {
            console.log('restaurantId is required.');
            return res.status(403).json({ error: 'restaurantId is required' });
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
  
const banDriver = async (req, res) => {
    try {
        const { driverId } = req.query;

        if (!driverId) {
            console.log('Order ID is required.');
            return res.status(403).json({ error: 'Order ID is required' });
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
  
const unBanUser = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            console.log('Order ID is required.');
            return res.status(403).json({ error: 'Order ID is required' });
        }

        const user = await User.findById(userId);

      if (!user) return res.status(404).json({ error: 'User not found.' })
  
      user.isBanned = false
      await user.save()
  
      res.json({ message: 'User has been un banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning user.' })
    }
}
  
const unBanDriver = async (req, res) => {
    try {
        const { driverId } = req.query;

        if (!driverId) {
            console.log('Order ID is required.');
            return res.status(403).json({ error: 'Order ID is required' });
        }

      const driver = await Driver.findById(driverId)
      if (!driver) return res.status(404).json({ error: 'Driver not found.' })
  
      driver.isBanned = false
      await driver.save()
  
      res.json({ message: 'Driver has been un banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning driver.' })
    }
}
  
const unBanRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        if (!restaurantId) {
            console.log('Order ID is required.');
            return res.status(403).json({ error: 'Order ID is required' });
        }

      const restaurant = await Restaurant.findById(restaurantId)
      if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' })
  
      restaurant.isBanned = false
      await restaurant.save()
  
      res.json({ message: 'Restaurant has been un banned.' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Server error while banning restaurant.' })
    }
}

module.exports =  {
    banUser,
    banDriver,
    banRestaurant,
    unBanUser,
    unBanDriver,
    unBanRestaurant
}