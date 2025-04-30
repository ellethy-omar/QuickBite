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
  
      if (Array.isArray(addresses)) {
        addresses.forEach((address) => {
          if (address._id) {
            const addressIndex = user.addresses.findIndex((a) => a._id.toString() === address._id.toString());
            if (addressIndex > -1) {
              user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...address };
            }
          } else {
            user.addresses.push(address);
          }
        });
      }
  
      Object.assign(user, updates);
  
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
