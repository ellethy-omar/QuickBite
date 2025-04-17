const User = require('../models/User');
// const Admin = require('../models/Admin'); // Assuming you have an Admin model
const Driver = require('../models/Driver'); // Assuming you have a Driver model
const Restaurant = require('../models/Restaurant');
const validator = require('validator');
const { generateToken } = require('../middleware/requireAuth'); // Import your JWT generator

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Validate email and password strength (assuming validator is imported)
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password is not strong enough' });
    }
  
    try {
      // Check if a user already exists with this username or email using the static method
      const existingUser = await User.userExists(username, email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const savedUser = await User.createUser({ username, email, password });
  
      // Generate JWT for the new user (assuming generateToken is defined and imported)
      const token = generateToken(savedUser._id);
  
      res.status(201).json({
        message: 'User registered successfully',
        user: savedUser,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error during registration' });
    }
};
  

// Login an existing user
const loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    
    // Ensure both username/email and password are provided
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Both username/email and password are required' });
    }
    
    try {
      // Use the new static method to check if the user exists
      const user = await User.findByUsernameOrEmail(usernameOrEmail);
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      // Use the instance method to check if the password matches
      const isMatch = await user.isPasswordMatch(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
    
      // Generate JWT for the user
      const token = generateToken(user._id, "user");
    
      res.status(200).json({
        message: 'Login successful',
        user,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error during login' });
    }
};

// Register a new Driver
const registerDriver = async (req, res) => {
  res.status(505).json({
    error: "Not implmented"
  })
  // const token = generateToken(driver._id, "driver");
};

// Login an existing Driver
const loginDriver = async (req, res) => {
  res.status(505).json({
    error: "Not implmented"
  })
  // const token = generateToken(driver._id, "driver");
};

// Register a new Admin
const registerAdmin = async (req, res) => {
  res.status(505).json({
    error: "Not implmented"
  })
  // const token = generateToken(admin._id, "admin");
};

// Login an existing user
const loginAdmin = async (req, res) => {
  res.status(505).json({
    error: "Not implmented"
  })
  // const token = generateToken(admin._id, "admin");
};


// Register a new Restaurant
const registerRestaurant = async (req, res) => {
  res.status(505).json({
    error: "Not implmented"
  })
  // const token = generateToken(Restaurant._id, "Restaurant");
};

// Login an existing user
const loginRestaurant = async (req, res) => {
  res.status(505).json({
    error: "Not implmented"
  })
  // const token = generateToken(Restaurant._id, "Restaurant");
};

const verifyToken = (req, res) => {
    res.status(200).json({ message: 'Token is valid', user: req.user });
};
  

module.exports = { 
  registerUser, 
  loginUser,
  registerDriver,
  loginDriver,
  registerAdmin,
  loginAdmin,
  registerRestaurant,
  loginRestaurant,
  verifyToken
};
