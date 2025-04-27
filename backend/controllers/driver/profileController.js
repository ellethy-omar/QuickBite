const Driver = require('../../models/Driver')

const getDriverProfile = async (req, res) => {
    const driver = Driver.findById(req.user._id);

    res.status(200).json({driver});
    console.log('driver:', driver);
}

const updateDriverProfile = async (req, res) => {
    res.status(505).json({
        errror: "Not implmented yet"
    });
}

const updateDriverProfilePhoto = async (req, res) => {
    try {
        const { imageBase64 } = req.body;

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

        driver.image = uploadResponse.secure_url;
        await driver.save();

        res.status(200).json({
            message: 'Image updated successfully',
            Driver: driver,
        });
        console.log('Driver:', driver);
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
