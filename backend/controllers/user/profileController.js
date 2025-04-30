const User = require('../../models/User');

const { uploadBase64Image } = require('../../controllers/cloudinaryController');

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    console.log('user:', user);

    res.status(200).json({user});
}

const updateUserProfile = async (req, res) => {
    try {
      const { name, email, phone, addresses } = req.body;
  
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (phone) updates.phone = phone;

      if (addresses) {
        if (!Array.isArray(addresses)) {
          console.log("Addresses should be an array");
          return res.status(403).json({ error: 'Addresses should be an array' });
        }
      
        const updatedAddresses = [];
      
        addresses.forEach(givenAddress => {
          if (givenAddress._id) {
            const existing = user.addresses.id(givenAddress._id);
            if (existing) {
              // Update existing address
              existing.address = givenAddress.address;
              existing.city = givenAddress.city;
              existing.state = givenAddress.state;
              existing.zipCode = givenAddress.zipCode;
              existing.country = givenAddress.country;
              updatedAddresses.push(existing);
            } else {
              // Address with given _id not found, treat as new
              updatedAddresses.push(givenAddress);
            }
          } else {
            // New address (no _id)
            updatedAddresses.push(givenAddress);
          }
        });
      
        user.addresses = updatedAddresses;
      }      
  
      await user.save();
  
      res.status(200).json({
        message: 'User profile updated successfully',
        user,
      });

      console.log('user:', user);
    } catch (err) {
      console.error('Error updating user profile:', err);
      res.status(500).json({ error: 'Failed to update user profile', details: err.message });
    }
};

const updateUserProfilePhoto = async (req, res) => {
    try {
        const { imageBase64, tags } = req.body;

        if (!imageBase64 || !tags || !Array.isArray(tags) || tags.length === 0) {
            console.log("Missing required fields");
            return res.status(403).json({ error: 'Product ID, imageBase64, and tags are required.' });
        }

        const user = await User.findById(req.user._id);

        const uploadResponse = await uploadBase64Image(imageBase64, tags);
        if (!uploadResponse || !uploadResponse.secure_url) {
            console.log("Image upload failed");
            return res.status(500).json({ error: 'Image upload failed.' });
        }

        user.profilePicture = uploadResponse.secure_url;
        await user.save();

        res.status(200).json({
          message: 'Profile image successfully',
          imageURL: uploadResponse.secure_url,
      });
      console.log('imageURL:', uploadResponse.secure_url);
    } catch (err) {
        console.error('Error updating user image:', err);
        res.status(500).json({ error: 'Failed to update user image', details: err.message });
    }
}

const restUserPassword = async (req, res) => {
    const user = User.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserProfilePhoto,
    restUserPassword
}
