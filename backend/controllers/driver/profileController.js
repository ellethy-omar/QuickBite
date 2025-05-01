const Driver = require('../../models/Driver')
const { uploadBase64Image } = require('../../controllers/cloudinaryController');
const getDriverProfile = async (req, res) => {
    const driver = await Driver.findById(req.user._id);

    res.status(200).json({driver});
    console.log('driver:', driver);
}

const updateDriverProfile = async (req, res) => {
    try {
        const driverId = req.user._id; // Must be set by your authentication middleware

        // Fields allowed to be updated
        const allowedFields = ['name', 'email', 'phone', 'vehicle'];

        // Filter request body to only allow allowedFields
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        // Perform the update
        const updatedDriver = await Driver.findByIdAndUpdate(
            driverId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedDriver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        delete updatedDriver.password;

        res.status(200).json({
            message: 'Driver profile updated successfully',
            driver: updatedDriver
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const updateDriverProfilePhoto = async (req, res) => {
    try {
        const { imageBase64, tags } = req.body;

        if (!imageBase64 || !tags || !Array.isArray(tags) || tags.length === 0) {
            console.log("Missing required fields");
            return res.status(403).json({ error: 'Product ID, imageBase64, and tags are required.' });
        }

        const driver = await Driver.findById(req.user._id);

        const uploadResponse = await uploadBase64Image(imageBase64, tags);
        if (!uploadResponse || !uploadResponse.secure_url) {
            console.log("Image upload failed");
            return res.status(500).json({ error: 'Image upload failed.' });
        }

        driver.profilePicture = uploadResponse.secure_url;
        await driver.save();

        res.status(200).json({
            message: 'Profile image updated successfully',
            imageURL: uploadResponse.secure_url,
        });
        console.log('imageURL:', uploadResponse.secure_url);
    } catch (err) {
        console.error('Error updating Driver image:', err);
        res.status(500).json({ error: 'Failed to update Driver image', details: err.message });
    }
}

const restDriverPassword = async (req, res) => {
    const driver = Driver.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    getDriverProfile,
    updateDriverProfile,
    updateDriverProfilePhoto,
    restDriverPassword
}
