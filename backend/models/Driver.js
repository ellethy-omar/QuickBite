const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const DriverSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   phone: { type: Number, required: true, unique: true },
   password: { type: String, required: true },
   Vehicle: 
   {type:String ,
   plateNumber: String,
   color: String},
   rating: Number,
   deliveryStats: 
   {completed: Number,
   avgDeliveryTime: Number
   },
   isActive: Boolean,
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