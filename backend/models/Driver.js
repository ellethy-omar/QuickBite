const mongoose = require('mongoose');
 
const { Schema } = mongoose.Schema;





const DriverSchema = new Schema({
   name: String,
   email: String,
   phone: Number,
   password: String,
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
  const Driver = mongoose.model('Driver', DriverSchema);
  
  module.exports = Driver;