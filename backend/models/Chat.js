// models/Chat.js
const mongoose = require('mongoose');
 
const { Schema } = mongoose.Schema;

const conversationSchema = new Schema({
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to a User model
      required: true,
      validate: {
        validator: function(participants) {
          // Ensure at least 2 participants and no duplicates
          return participants.length >= 2 && 
                 new Set(participants.map(id => id.toString())).size === participants.length;
        },
        message: 'Conversation must have at least 2 unique participants'
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, {
    timestamps: true // Adds createdAt and updatedAt automatically
  });
   const Chat = mongoose.model('Chat', conversationSchema);
    
    module.exports = Chat;