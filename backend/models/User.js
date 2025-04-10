// models/User.js
const mongoose = require('mongoose');
 
const { Schema } = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = mongoose.model('User', userSchema);
module.exports = User;
// Address 
const addressSchema = new Schema({
    label: String,
    area: String,
    street: String,
    building: String,
    floor: String,
    apartment: String,
    isDefault: Boolean
  });

  // User schema
const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: String, // In production, you should hash passwords!
    addresses: [addressSchema],
    createdAt: { type: Date, default: Date.now }
  });



  async function verifyUser(email, plainPassword) {
    try {
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return { success: false, message: 'User not found' };
      }
  
      const isMatch = await bcrypt.compare(plainPassword, user.password);
      
      if (!isMatch) {
        return { success: false, message: 'Invalid credentials' };
      }
  
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Verification error:', error);
      return { success: false, message: 'Authentication error' };
    }
  }
  
