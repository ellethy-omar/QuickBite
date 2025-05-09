// models/Message.js
const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const messageSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  senderId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  senderType: {
    type: String,
    required: true,
    enum: ['user', 'driver']
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

messageSchema.index({ chatId: 1, createdAt: 1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;