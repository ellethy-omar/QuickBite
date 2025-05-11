const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Admin' // Only admins can send
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'receiverModel' 
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['User', 'Driver', 'Restaurant'] // Allowed receiver types
  },
  description: {
    type: String,
    required: true
  },
  data: {
    type: Schema.Types.Mixed, // Optional
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification;