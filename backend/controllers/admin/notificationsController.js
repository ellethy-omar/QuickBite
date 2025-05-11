const Request = require('../../models/Request');
const Notification = require('../../models/Notification');
const Driver = require('../../models/Driver'); // Assuming you have this model
const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');
const Admin = require('../../models/Admin');
const cloudinary = require('cloudinary').v2;

const getAllRequests = async (req, res) => {
    try {
        const { status, senderModel } = req.query;
        
        const query = {};
        if (status) query.status = status;
        if (senderModel) query.senderModel = senderModel;
        
        const requests = await Request.find(query).populate({
            path: 'senderId'
        })
        .sort({ createdAt: -1 });
        
        res.status(200).json({
            count: requests.length,
            requests: requests
        });
    } catch (error) {
        console.log('Get requests error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const getRequestById = async (req, res) => {
  try {
    const { requestId } = req.query;

    const request = await Request
      .findById(requestId)
      .populate({
        path: 'senderId'
      });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({ request });

    console.log('request:', request);
  } catch (error) {
    console.log('Get request error:', error);
    res
      .status(500)
      .json({ error: 'Internal server error', details: error.message });
  }
};


// Process a driver profile update request
const processDriverProfileUpdateRequest = async (req, res) => {
    try {
        const adminId = req.user._id; // Admin ID from auth middleware
        const { status, adminMessage, requestId } = req.body;
        
        if (!['accepted', 'declined'].includes(status)) {
            return res.status(403).json({ error: 'Status must be either accepted or declined' });
        }
        
        // Find the request
        const request = await Request.findById(requestId);
        
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        
        if (request.status !== 'pending') {
            return res.status(403).json({ error: 'This request has already been processed' });
        }
        
        if (request.senderModel !== 'Driver' || 
            (request.data && request.data.originalRequest !== 'updateDriverProfile')) {
            return res.status(403).json({ error: 'Invalid request type' });
        }
        
        // Update request status (but wait to save it until we're sure everything is OK)
        request.status = status;
        
        // If accepted, apply the changes
        let updatedDriver = null;
        let updateError = null;
        
        if (status === 'accepted') {
            try {
                // Check for unique field conflicts before updating
                if (request.data.updates.phone) {
                    const existingDriver = await Driver.findOne({ 
                        phone: request.data.updates.phone,
                        _id: { $ne: request.senderId } // Exclude the current driver
                    });
                    
                    if (existingDriver) {
                        throw new Error(`Phone number ${request.data.updates.phone} is already in use by another driver`);
                    }
                }
                
                if (request.data.updates.email) {
                    const existingDriver = await Driver.findOne({ 
                        email: request.data.updates.email,
                        _id: { $ne: request.senderId } // Exclude the current driver
                    });
                    
                    if (existingDriver) {
                        throw new Error(`Email ${request.data.updates.email} is already in use by another driver`);
                    }
                }
                
                // Proceed with the update
                updatedDriver = await Driver.findByIdAndUpdate(
                    request.senderId,
                    { $set: request.data.updates },
                    { new: true, runValidators: true }
                );
                
                if (!updatedDriver) {
                    throw new Error('Driver not found');
                }
            } catch (err) {
                request.status = 'declined';
                updateError = err.message;
                
                console.log('Failed to update driver:', err);
            }
        }
        
        await request.save();
        
        const admin = await Admin.findById(adminId);
        if(!admin.handledRequests)
            admin.handledRequests = 0;

        admin.handledRequests++;

        await admin.save();
        // Create notification for the driver
        const notificationMessage = updateError 
            ? `Your profile update request was declined: ${updateError}`
            : (status === 'accepted' 
                ? 'Your profile update request has been approved' 
                : 'Your profile update request has been declined');
                
        const notification = new Notification({
            senderId: adminId,
            receiverId: request.senderId,
            receiverModel: 'Driver',
            description: notificationMessage,
            data: {
                requestId: request._id,
                status: status,
                message: updateError || adminMessage || '',
                updates: request.data.updates,
                error: updateError || null
            }
        });
        
        await notification.save();
        
        // Return appropriate response
        if (updateError) {
            console.log("upadte Error: ", updateError)
            return res.status(409).json({
                message: 'Request declined due to conflicts',
                error: updateError,
                request,
                notification
            });
        }
        
        res.status(200).json({
            message: `Request ${status === 'accepted' ? 'approved' : 'declined'} successfully`,
            request,
            notification,
            ...(updatedDriver ? { driver: updatedDriver } : {})
        });

        console.log("res.body", res.body);
    } catch (error) {
        console.log('Process request error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const processDriverProfilePhotoUpdateRequest = async (req, res) => {
    try {
        const adminId = req.user._id;
        const { status, adminMessage, requestId } = req.body;
        
        if (!['accepted', 'declined'].includes(status)) {
            return res.status(403).json({ error: 'Status must be either accepted or declined' });
        }
        
        const request = await Request.findById(requestId);
        
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        
        if (request.status !== 'pending') {
            return res.status(403).json({ error: 'This request has already been processed' });
        }
        
        if (request.senderModel !== 'Driver' || 
            (request.data && request.data.originalRequest !== 'updateDriverProfilePhoto')) {
            return res.status(403).json({ error: 'Invalid request type' });
        }
        
        request.status = status;
        await request.save();

        const admin = await Admin.findById(adminId);
        if(!admin.handledRequests)
            admin.handledRequests = 0;

        admin.handledRequests++;

        await admin.save();
        
        const { imageUrl, publicId, tags } = request.data;
        let finalImageUrl = null;
        
        if (status === 'accepted') {
            const driver = await Driver.findById(request.senderId);
            if (!driver) {
                return res.status(404).json({ error: 'Driver not found' });
            }
            
            try {
                await cloudinary.uploader.remove_tag('temporary', [publicId]);
                await cloudinary.uploader.remove_tag('pending_approval', [publicId]);
                
                const permanentTags = [...tags, 'approved'];
                await cloudinary.uploader.add_tag(permanentTags, [publicId]);
                
                driver.profilePicture = imageUrl;
                await driver.save();
                
                finalImageUrl = imageUrl;
            } catch (cloudinaryError) {
                console.log('Cloudinary error:', cloudinaryError);
                return res.status(500).json({ error: 'Failed to process image', details: cloudinaryError.message });
            }
        } else {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (deleteError) {
                console.log('Failed to delete temporary image:', deleteError);
            }
        }
        
        const notification = new Notification({
            senderId: adminId,
            receiverId: request.senderId,
            receiverModel: 'Driver',
            description: status === 'accepted' 
                ? 'Your profile photo update request has been approved' 
                : 'Your profile photo update request has been declined',
            data: {
                requestId: request._id,
                status: status,
                message: adminMessage || '',
                imageURL: finalImageUrl
            }
        });
        
        await notification.save();
        
        res.status(200).json({
            message: `Request ${status === 'accepted' ? 'approved' : 'declined'} successfully`,
            request,
            notification,
            imageURL: finalImageUrl
        });

        console.log('notification:', notification);
    } catch (error) {
        console.log('Process photo request error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const processRequest = async (req, res) => {
    try {
        const adminId = req.user._id;
        const { status, adminMessage, requestId } = req.body;
        
        if (!['accepted', 'declined'].includes(status)) {
            return res.status(403).json({ error: 'Status must be either accepted or declined' });
        }
        
        const request = await Request.findById(requestId);
        
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        
        if (request.status !== 'pending') {
            return res.status(403).json({ error: 'This request has already been processed' });
        }

        request.status = status;
        await request.save();

        const admin = await Admin.findById(adminId);
        if(!admin.handledRequests)
            admin.handledRequests = 0;

        admin.handledRequests++;

        await admin.save();

        const notification = new Notification({
            senderId: adminId,
            receiverId: request.senderId,
            receiverModel: request.senderModel,
            description: status === 'accepted' 
                ? 'Your request has been approved' 
                : 'Your request has been declined',
            data: {
                requestId: request._id,
                status: status,
                message: adminMessage || '',
            }
        });
        
        await notification.save();
        
        res.status(200).json({
            message: `Request ${status === 'accepted' ? 'approved' : 'declined'} successfully`,
            request,
            notification,
        });
        console.log("res.body: ", res.body);

    } catch (error) {
        console.log("Error in processing Request");
        res.status(500).json({ error: 'Error in processing Request', details: error.message });
    }
}

const sendNotification = async (req, res) => {
    try {
        const adminId = req.user._id;
        const { receiverId, receiverModel, description, data } = req.body;
        
        if (!receiverId || !receiverModel || !description) {
            return res.status(403).json({ 
                error: 'Missing required fields. receiverId, receiverModel, and description are required.' 
            });
        }
        
        if (!['User', 'Driver', 'Restaurant'].includes(receiverModel)) {
            return res.status(403).json({ 
                error: 'Invalid receiverModel. Must be one of: User, Driver, Restaurant' 
            });
        }
        
        let receiver;
        switch(receiverModel) {
            case 'User':
                receiver = await User.findById(receiverId);
                break;
            case 'Driver':
                receiver = await Driver.findById(receiverId);
                break;
            case 'Restaurant':
                receiver = await Restaurant.findById(receiverId);
                break;
            default:
                receiver = null;
        }
        
        if (!receiver) {
            return res.status(404).json({ 
                error: `${receiverModel} with ID ${receiverId} not found` 
            });
        }
        
        const notification = new Notification({
            senderId: adminId,
            receiverId,
            receiverModel,
            description,
            data: data || null,
            createdAt: Date.now()
        });
        
        await notification.save();
        
        res.status(201).json({
            message: 'Notification sent successfully',
            notification
        });

        console.log('notification:', notification);
    } catch (error) {
        console.log('Send notification error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    getAllRequests,
    getRequestById,
    processDriverProfileUpdateRequest,
    processDriverProfilePhotoUpdateRequest,
    sendNotification,
    processRequest
};