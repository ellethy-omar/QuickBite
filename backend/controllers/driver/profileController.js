const Driver = require('../../models/Driver')
const Request = require('../../models/Request')
const { uploadBase64Image } = require('../../controllers/cloudinaryController');

const getDriverProfile = async (req, res) => {
    const driver = await Driver.findById(req.user._id);

    res.status(200).json({driver});
    console.log('driver:', driver);
}

const updateDriverProfile = async (req, res) => {
    try {
        const driverId = req.user._id;

        const allowedFields = ['name', 'email', 'phone', 'vehicle'];

        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const request = new Request({
            senderId: driverId,
            senderModel: 'Driver',
            description: 'Driver profile update request',
            data: {
                updates: updates,
                originalRequest: 'updateDriverProfile'
            },
            status: 'pending'
        });

        await request.save();

        res.status(200).json({
            message: 'Profile update request submitted successfully. Waiting for admin approval.',
            requestId: request._id
        });

        console.log('request', request);

    } catch (error) {
        console.log('Submit request error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const updateDriverProfilePhoto = async (req, res) => {
    try {
        const driverId = req.user._id;
        const { imageBase64, tags } = req.body;

        if (!imageBase64 || !tags || !Array.isArray(tags) || tags.length === 0) {
            console.log("Missing required fields");
            return res.status(403).json({ error: 'imageBase64 and tags are required.' });
        }

        const temporaryTags = [...tags, 'temporary', 'pending_approval'];
        
        try {
            const uploadResponse = await uploadBase64Image(imageBase64, temporaryTags);
            
            if (!uploadResponse || !uploadResponse.secure_url) {
                console.log("Image upload failed");
                return res.status(500).json({ error: 'Temporary image upload failed.' });
            }
            
            const request = new Request({
                senderId: driverId,
                senderModel: 'Driver',
                description: 'Driver profile photo update request',
                data: {
                    imageUrl: uploadResponse.secure_url,
                    publicId: uploadResponse.public_id,
                    tags: tags,
                    originalRequest: 'updateDriverProfilePhoto'
                },
                status: 'pending'
            });

            await request.save();

            res.status(200).json({
                message: 'Profile photo update request submitted successfully. Waiting for admin approval.',
                requestId: request._id,
                temporaryImageUrl: uploadResponse.secure_url
            });

            console.log('request:', request);
            
        } catch (uploadError) {
            console.log('Image upload error:', uploadError);
            return res.status(500).json({ error: 'Failed to upload image', details: uploadError.message });
        }

    } catch (error) {
        console.log('Submit request error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

module.exports = {
    getDriverProfile,
    updateDriverProfile,
    updateDriverProfilePhoto
}
