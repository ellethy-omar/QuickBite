const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// Schema for opening hours (reused for each day)
const dailyHoursSchema = new Schema({
    open: { type: String, required: true, match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/ },
    close: { type: String, required: true, match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/ }
});
  
  // Schema for contact information
const contactSchema = new Schema({
    phone: { type: String, required: true },
    email: { type: String, lowercase: true, match: [/.+\@.+\..+/, 'Please enter a valid email'] },
    password: { type: String, required: true }
});
  
  // Schema for address
const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true }
});
  
  // Schema for opening hours (contains all days)
const openingHoursSchema = new Schema({
    sunday: dailyHoursSchema,
    monday: dailyHoursSchema,
    tuesday: dailyHoursSchema,
    wednesday: dailyHoursSchema,
    thursday: dailyHoursSchema,
    friday: dailyHoursSchema,
    saturday: dailyHoursSchema
});
  
// Main restaurant schema
const restaurantSchema = new Schema({
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    cuisineType: {
      type: [String],
      required: true,
      validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: 'At least one cuisine type is required'
      }
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    address: addressSchema,
    contact: contactSchema,
    openingHours: openingHoursSchema,
    isActive: {
      type: Boolean,
      default: true
    },
    logo: String,
    coverImage: String,
    isBanned:{type: Boolean, default:false} 
  }, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

restaurantSchema.statics.restaurantExists = async function (email, phone) {
  return await this.findOne({ $or: [{ "contact.email": email }, { "contact.phone": phone }] });
};

restaurantSchema.statics.createRestaurant = async function (data) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.contact.password, salt);
  
  // Clone to avoid mutating original input
  const dataCopy = JSON.parse(JSON.stringify(data));
  dataCopy.contact.password = hashedPassword;

  return await this.create(dataCopy);
};


restaurantSchema.statics.findByEmailOrPhone = async function (identifier) {
  return await this.findOne({
    $or: [{ "contact.email": identifier }, { "contact.phone": identifier }]
  });
};

restaurantSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.contact.password);
};

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;