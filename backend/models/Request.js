
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequestSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel'
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['User', 'Restaurant', 'Driver']  //accepted user types 
  },
  description: {
    type: String,
    required: true
  },
  data: {
    type: Schema.Types.Mixed, // Flexible field for additional request data
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update 'updatedAt' on save
RequestSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;