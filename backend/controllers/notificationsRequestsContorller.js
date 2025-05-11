const Notification = require('../models/Notification');
const Request = require('../models/Request')

const findModel = (role) => {
    switch (role) {
        case "user":
            return "User"
        case "restaurant":
            return "Restaurant"
        case "driver":
            return "Driver"
        default:
            return null;
    }
}

const getMyrequests = async (req, res) => {
    try {
        const model = findModel(req.user.role);

        const myRequests = await Request.find(
            {
                senderId: req.user._id,
                senderModel: model
            }
        )

        res.status(200).json({myRequests})

        console.log('myRequests:', myRequests);
    } catch (error) {
        console.log('Error fetching requests ', error);
        res.status(500).json({ error: 'Error fetching requests', details: error.message })
    }
};

const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const model = findModel(req.user.role);
        
        const notifications = await Notification.find({
            receiverId: userId,
            receiverModel: model
        }).sort({ createdAt: -1 });
        
        res.status(200).json({
            count: notifications.length,
            notifications
        });
    } catch (error) {
        console.log('Get notifications error:', error);
        res.status(500).json({ error: 'Get notifications error:', details: error.message });
    }
};

const sendRequest = async (req, res) => {
  try {
    // Destructure the expected fields from the request body
    // You can also obtain senderId/senderModel from your auth middleware if you prefer
    const { description, data = {}} = req.body;
    const model = findModel(req.user.role);

    // Basic validation
    if (!description) {
      return res
        .status(403)
        .json({ error: 'description are required.' });
    }

    // Create and save the Request
    const request = await Request.create({
      senderId: req.user._id,
      senderModel: model,
      description,
      data
    });

    res.status(201).json({ request });
    console.log("request:", request)
  } catch (error) {
    console.log('Error sending request:', error);
    return res
      .status(500)
      .json({ error: 'Error sending request.', details: error.message });
  }
};


module.exports = {
    getMyrequests,
    getNotifications,
    sendRequest
}