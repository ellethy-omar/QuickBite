const Restaurant = require('../../models/Restaurant');
const { uploadBase64Image } = require('../../controllers/cloudinaryController');
const getRestaurantProfie = async (req ,res) => {
    const restaurant = await Restaurant.findById(req.user._id);

    res.status(200).json({
        restaurant
    });
    console.log('restaurant:', restaurant);
}

const updateRestaurantProfile = async (req, res) => {
    try {
      const restaurantId = req.user._id;  // Assuming the user's ID is the restaurant's ID
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      const {
        name,
        description,
        cuisineType,
        address,
        contact,
        openingHours,
        isActive,
      } = req.body;
  
      // Create an object with the fields to update
      const updates = {};
  
      if (name) updates.name = name;
      if (description) updates.description = description;
      if (cuisineType) updates.cuisineType = cuisineType;
      if (address) updates.address = address;
      if (contact) updates.contact = contact;
      if (openingHours) updates.openingHours = openingHours;
      if (isActive !== undefined) updates.isActive = isActive;
  
      Object.assign(restaurant, updates);
  
      await restaurant.save();
  
      res.status(200).json({
        message: 'Restaurant profile updated successfully',
        restaurant,
      });
    } catch (err) {
      console.log('Error updating restaurant profile:', err);
      res.status(500).json({ error: 'Failed to update restaurant profile', details: err.message });
    }
};
  

const updateRestaurantLogo = async (req, res) => {
    try {
        const { imageBase64, tags } = req.body;

        if (!imageBase64 || !tags || !Array.isArray(tags) || tags.length === 0) {
            console.log("Missing required fields");
            return res.status(403).json({ error: 'Product ID, imageBase64, and tags are required.' });
        }

        const restaurant = await Restaurant.findById(req.user._id);

        const uploadResponse = await uploadBase64Image(imageBase64, tags);
        if (!uploadResponse || !uploadResponse.secure_url) {
            console.log("Image upload failed");
            return res.status(500).json({ error: 'Image upload failed.' });
        }

        restaurant.logo = uploadResponse.secure_url;
        await restaurant.save();

        res.status(200).json({
            message: 'Logo updated successfully',
            imageURL: uploadResponse.secure_url,
        });
        console.log('imageURL:', uploadResponse.secure_url);
    } catch (err) {
        console.log('Error updating Restaurant Logo:', err);
        res.status(500).json({ error: 'Failed to update Restaurant Logo', details: err.message });
    }
}

const updateRestaurantCoverImage = async (req, res) => {
    try {
        const { imageBase64, tags } = req.body;

        if (!imageBase64 || !tags || !Array.isArray(tags) || tags.length === 0) {
            console.log("Missing required fields");
            return res.status(403).json({ error: 'Product ID, imageBase64, and tags are required.' });
        }

        const restaurant = await Restaurant.findById(req.user._id);

        const uploadResponse = await uploadBase64Image(imageBase64, tags);
        if (!uploadResponse || !uploadResponse.secure_url) {
            console.log("Image upload failed");
            return res.status(500).json({ error: 'Image upload failed.' });
        }

        restaurant.coverImage = uploadResponse.secure_url;
        await restaurant.save();

        res.status(200).json({
            message: 'Cover image updated successfully',
            imageURL: uploadResponse.secure_url,
        });
        console.log('imageURL:', uploadResponse.secure_url);
    } catch (err) {
        console.log('Error updating Restaurant Cover image:', err);
        res.status(500).json({ error: 'Failed to update Restaurant Cover image', details: err.message });
    }
}

const resetRestaurantPassword = async (req, res) => {
    const restaurant = await Restaurant.findById(req.user._id);

    res.status(505).json({
        errror: "Not implmented yet"
    });
}

module.exports = {
    getRestaurantProfie,
    updateRestaurantProfile,
    updateRestaurantLogo,
    updateRestaurantCoverImage,
    resetRestaurantPassword
}