// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// Address schema
const addressSchema = new Schema({
  label: String,
  area: String,
  street: String,
  building: String,
  floor: String,
  apartment: String,
  isDefault: Boolean  //there should be one address in the array with isDefault=true 
});

// User schema
const userSchema = new Schema({
     name: String,
     email: { type: String, required: true, unique: true },
     phone: String,
     password: { type: String, required: true, select: false }, // exclude from default query
     addresses: [addressSchema],
     profilePicture: String,
     isBanned:{type: Boolean, default:false} ,
     createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.statics.userExists = async function (username, email) {
  return await this.findOne({ $or: [{ name: username }, { email }] });
};

userSchema.statics.createUser = async function ({ username, email, password, phone, addresses }) {
  const newUser = new this({
    name: username,
    email,
    password,
    phone,
    addresses
  });
  return await newUser.save();
};


userSchema.statics.findByEmail = async function(email) {
  return this.findOne({ email }).select('+password');
};

userSchema.statics.findByUsernameOrEmail = async function(identifier) {
  return this.findOne({ $or: [{ name: identifier }, { email: identifier }] }).select('+password');
};

userSchema.statics.findByIdSafe = async function(id) {
  return this.findById(id).select('-password');
};

userSchema.methods.isPasswordMatch = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
