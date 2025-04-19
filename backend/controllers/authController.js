const User = require('../models/User');
// const Admin = require('../models/Admin'); // Assuming you have an Admin model
const Driver = require('../models/Driver'); // Assuming you have a Driver model
const Restaurant = require('../models/Restaurant');
const validator = require('validator');
const { generateToken } = require('../middleware/requireAuth'); // Import your JWT generator

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password, phone, addresses } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(403).json({ error: 'All fields are required' });
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
        return res.status(403).json({ error: 'User already exists' });
      }
  
      const savedUser = await User.createUser({ username, email, password, phone, addresses });
  
      // Generate JWT for the new user (assuming generateToken is defined and imported)
      const token = generateToken(savedUser._id, "user");
  
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          phone: savedUser.phone,
          addresses: savedUser.addresses
        },
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
      return res.status(403).json({ error: 'Both username/email and password are required' });
    }
    
    try {
      // Use the new static method to check if the user exists
      const user = await User.findByUsernameOrEmail(usernameOrEmail);
      if (!user) {
        return res.status(404).json({ error: 'Invalid credentials' });
      }
      
      // Use the instance method to check if the password matches
      const isMatch = await user.isPasswordMatch(password);
      if (!isMatch) {
        return res.status(404).json({ error: 'Invalid credentials' });
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
  const { name, email, phone, password, vehicle } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(403).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password is not strong enough' });
  }

  try {
    const existingDriver = await Driver.driverExists(email, phone);
    if (existingDriver) {
      return res.status(410).json({ error: 'Driver already exists' });
    }

    const newDriver = await Driver.createDriver({ name, email, phone, password, vehicle });

    const token = generateToken(newDriver._id, 'driver');

    res.status(201).json({
      message: 'Driver registered successfully',
      driver: newDriver,
      token
    });
  } catch (error) {
    console.error('Driver registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login existing Driver
const loginDriver = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res.status(403).json({ error: 'Both email/phone and password are required' });
  }

  try {
    const driver = await Driver.findByEmailOrPhone(emailOrPhone);
    if (!driver) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isMatch = await driver.isPasswordMatch(password);
    if (!isMatch) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(driver._id, 'driver');

    res.status(200).json({
      message: 'Login successful',
      driver,
      token
    });
  } catch (error) {
    console.error('Driver login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
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

// Register a new restaurant
const registerRestaurant = async (req, res) => {
  const {
    name, description, cuisineType,
    address, contact, openingHours
  } = req.body;

  if (!name || !description || !cuisineType || !address || !contact || !contact.email || !contact.phone || !contact.password) {
    return res.status(403).json({ error: 'Missing required fields' });
  }

  if (!validator.isEmail(contact.email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!validator.isStrongPassword(contact.password)) {
    return res.status(400).json({ error: 'Weak password' });
  }

  try {
    const existing = await Restaurant.restaurantExists(contact.email, contact.phone);
    if (existing) {
      return res.status(410).json({ error: 'Restaurant already exists' });
    }

    const newRestaurant = await Restaurant.createRestaurant({
      name, description, cuisineType,
      address, contact, openingHours
    });

    const token = generateToken(newRestaurant._id, 'restaurant');

    res.status(201).json({
      message: 'Restaurant registered successfully',
      restaurant: newRestaurant,
      token
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login an existing restaurant
const loginRestaurant = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res.status(403).json({ error: 'Both email/phone and password are required' });
  }

  try {
    const restaurant = await Restaurant.findByEmailOrPhone(emailOrPhone);
    if (!restaurant) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isMatch = await restaurant.isPasswordMatch(password);
    if (!isMatch) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(restaurant._id, 'restaurant');

    res.status(200).json({
      message: 'Login successful',
      restaurant,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
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
