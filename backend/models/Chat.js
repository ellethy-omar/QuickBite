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
      enum: ['user', 'driver']
    }
  }],
  // Reference to the order that initiated this chat
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

conversationSchema.index({ 'participants.participantId': 1 });
conversationSchema.index({ orderId: 1 });

conversationSchema.statics.findByParticipants = async function(userId, driverId) {
  return this.findOne({
    participants: {
      $all: [
        { $elemMatch: { participantId: userId, participantType: 'user' } },
        { $elemMatch: { participantId: driverId, participantType: 'driver' } }
      ]
    }
  });
};


const Chat = mongoose.model('Chat', conversationSchema);
module.exports = Chat;