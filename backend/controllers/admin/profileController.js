
const Admin = require('../../models/Admin')
const { uploadBase64Image } = require('../../controllers/cloudinaryController');
const getAdminProfile = async (req, res) => {
    const admin = Admin.findById(req.user._id);

    res.status(200).json({admin});
}

const updateAdminProfile = async (req, res) => {
    const admin = Admin.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const updateAdminProfilePhoto = async (req, res) => {
    try {
        const { imageBase64, tags } = req.body;

        if (!imageBase64 || !tags || !Array.isArray(tags) || tags.length === 0) {
            console.log("Missing required fields");
            return res.status(403).json({ error: 'Product ID, imageBase64, and tags are required.' });
        }

        const admin = await Admin.findById( req.user._id);

        const uploadResponse = await uploadBase64Image(imageBase64, tags);
        if (!uploadResponse || !uploadResponse.secure_url) {
            console.log("Image upload failed");
            return res.status(500).json({ error: 'Image upload failed.' });
        }
        admin.profilePicture = uploadResponse.secure_url;
        await admin.save();

        res.status(200).json({
            message: 'Profile image updated successfully',
            imageURL: uploadResponse.secure_url,
        });
        console.log('imageURL:', uploadResponse.secure_url);
    } catch (err) {
        console.error('Error updating Admin image:', err);
        res.status(500).json({ error: 'Failed to update Admin image', details: err.message });
    }
}

const restAdminPassword = async (req, res) => {
    const admin = Admin.findById(req.user._id);

    // I need some updating logic here

    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    getAdminProfile,
    updateAdminProfile,
    updateAdminProfilePhoto,
    restAdminPassword
}
