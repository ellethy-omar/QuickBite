const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const DriverSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   phone: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   vehicle: 
     {
      plateNumber: String,
      model: String,
      cateogry:String 
    },
   rating: {type: Number, default: 0.0},
   deliveryStats: 
     {
       completed:{type: Number, default: 0},
       avgDeliveryTime:{type: Number, default: 0.0},
     },
   isBanned:{type: Boolean, default:false} ,
   profilePicture: String,
   createdAt:  { type: Date, default: Date.now }

});

// 🔐 Static method to check if driver exists
DriverSchema.statics.driverExists = async function (email, phone) {
   return await this.findOne({
     $or: [{ email }, { phone }]
   });
 };
 
 // 📦 Static method to create a new driver with hashed password
 DriverSchema.statics.createDriver = async function (data) {
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(data.password, salt);
   data.password = hashedPassword;
 
   const driver = new this(data);
   return await driver.save();
 };
 
 // 🔑 Instance method to compare password
 DriverSchema.methods.isPasswordMatch = async function (password) {
   return await bcrypt.compare(password, this.password);
 };
 
 // 🔍 Static method to find driver by email or phone
 DriverSchema.statics.findByEmailOrPhone = async function (input) {
  if(!isNaN(input)){
    return await this.findOne({ phone: Number(input) });
  } else {
    return await this.findOne({ email: input });
  }
};

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;