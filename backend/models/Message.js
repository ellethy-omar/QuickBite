// models/Message.js
const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const messageSchema = new Schema({
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;