const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true, select: false }, // exclude from default query
    createdAt: { type: Date, default: Date.now }
  });

  AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });
  
  AdminSchema.statics.AdminExists = async function (username, email) {
    return await this.findOne({ $or: [{ name: username }, { email }] });
  };
  
  AdminSchema.statics.createAdmin = async function ({ username, email, password, phone}) {
    const newUser = new this({
      name: username,
      email,
      password,
      phone
    });
    return await newUser.save();
  };
  
  
  AdminSchema.statics.findByEmail = async function(email) {
    return this.findOne({ email }).select('+password');
  };
  
  AdminSchema.statics.findByUsernameOrEmail = async function(identifier) {
    return this.findOne({ $or: [{ name: identifier }, { email: identifier }] }).select('+password');
  };
  
AdminSchema.methods.isPasswordMatch = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  };
  
  const Admin = mongoose.model('Admin', AdminSchema);
  module.exports = Admin;