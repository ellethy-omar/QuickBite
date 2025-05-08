// models/Chat.js
const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const conversationSchema = new Schema({
  participants: [{
      _id: false, 
      participantId: {
          type: Schema.Types.ObjectId,
          required: true,
          refPath: 'participants.participantType'
      },
      participantType: {
          type: String,
          required: true,
          enum: ['User', 'Driver']   //only allowed user w driver 
      }
  }],
  createdAt: {
      type: Date,
      default: Date.now
  }
}, {
  timestamps: true
});

const Chat = mongoose.model('Chat', conversationSchema);
module.exports = Chat;