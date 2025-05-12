const Driver = require('../../models/Driver')
const Restaurant = require('../../models/Restaurant')
const User = require('../../models/User')
const Product = require('../../models/Product')
const Notification = require('../../models/Notification')

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

const banProduct = async (req, res) => {
  try {
    const { productId, reason } = req.body

    if(!productId || !reason) {
      console.log("Product Id & reason are required")
      return res.status(403).json({ error: "Product ID are required "});
    }

    const product = await Product.findById(productId);
    
    if(!product) {
      console.log("product not found")
      return res.status(404).json({error: "Product not found"})
    }

    product.isBanned = true;

    await product.save();

    const notification = new Notification({
      senderId: req.user._id,
      receiverId: product.restaurantId,
      receiverModel: 'Restaurant',
      description: reason,
      data: data || null,
      createdAt: Date.now()
    });
            
    await notification.save();

    res.status(200).json({
      message: "banned Product succesfully and sent notifcation to restaurant."
    })

    console.log("product & notification", product, notification);

  } catch (error) {
    console.log("Error banning product", error)
    res.status(500).json({error: 'Server error while banning product', details: error.message})
  }
}

const unBanProduct = async (req, res) => {
  try {
    const { productId } = req.query

    if(!productId) {
      console.log("Product Id is required")
      return res.status(403).json({ error: "Product ID are required "});
    }

    const product = await Product.findById(productId);

    if(!product) {
      console.log("product not found")
      return res.status(404).json({error: "Product not found"})
    }

    product.isBanned = false;

    await product.save();
    res.status(200).json({
      message: "Unbanned Product succesfully."
    })

    console.log("product", product);

  } catch (error) {
    console.log("Error banning product", error)
    res.status(500).json({error: 'Server error while banning product', details: error.message})
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
    banProduct,
    unBanProduct,
    unBanUser,
    unBanDriver,
    unBanRestaurant
}