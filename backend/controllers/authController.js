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
      console.log("All fields are not available for user registration");
      return res.status(403).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      console.log("Email is not valid");
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!validator.isStrongPassword(password)) {
      console.log("Password is not strong enough");
      return res.status(400).json({ error: 'Password is not strong enough' });
    }

    try {
      const existingUser = await User.userExists(username, email);
      if (existingUser) {
        console.log("User already exist");
        return res.status(403).json({ error: 'User already exists' });
      }

      const savedUser = await User.createUser({ username, email, password, phone, addresses });
  
      const token = generateToken(savedUser._id, "user");
  
      delete savedUser.password;

      res.status(201).json({
        message: 'User registered successfully',
        user: savedUser,
        token
      });

      console.log('savedUser:', savedUser);

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error during registration', details: error });
    }
};
  

// Login an existing user
const loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    
    // Ensure both username/email and password are provided
    if (!usernameOrEmail || !password) {
      console.log("Both username/email and password are not available for user login");
      return res.status(403).json({ error: 'Both username/email and password are required' });
    }
    console.log("Both username/email and password are available for user login");

    try {
      const user = await User.findByUsernameOrEmail(usernameOrEmail);
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: 'Invalid credentials' });
      }

      console.log("User Found");
      const isMatch = await user.isPasswordMatch(password);
      if (!isMatch) {
        console.log("Password does not match");
        return res.status(404).json({ error: 'Invalid credentials' });
      }

      console.log("User Found");
    
      // Generate JWT for the user
      const token = generateToken(user._id, "user");
     
      delete user.password;

      res.status(200).json({
        message: 'Login successful',
        user,
        token
      });

      console.log('user:', user);

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error during login', details: error });
    }
};

// Register a new Driver
const registerDriver = async (req, res) => {
  const { name, email, phone, password, vehicle } = req.body;

  if (!name || !email || !phone || !password) {
    console.log("All fields are not available for driver registration");
    return res.status(403).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    console.log("Email is not valid");
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!validator.isStrongPassword(password)) {
    console.log("Password is not strong enough");
    return res.status(400).json({ error: 'Password is not strong enough' });
  }
  

  try {
    const existingDriver = await Driver.driverExists(email, phone);
    if (existingDriver) {
      console.log("Driver already exists");
      return res.status(410).json({ error: 'Driver already exists' });
    }

    const newDriver = await Driver.createDriver({ name, email, phone, password, vehicle });
    
    const token = generateToken(newDriver._id, 'driver');

    delete newDriver.password;

    res.status(201).json({
      message: 'Driver registered successfully',
      driver: newDriver,
      token
    });
    console.log('newDriver:', newDriver);

  } catch (error) {
    console.error('Driver registration error:', error);
    res.status(500).json({ error: 'Server error during registration', details: error });
  }
};

// Login existing Driver
const loginDriver = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    console.log("Both phone/email and password are not available for user login");
    return res.status(403).json({ error: 'Both email/phone and password are required' });
  }

  try {
    if(!validator.isEmail(emailOrPhone) && isNaN(emailOrPhone)) {
      console.log("emailOrPhone is not an email or a phone number");
      return res.status(403).json({ error: 'emailOrPhone is not an email or a phone number' });
    }

    const driver = await Driver.findByEmailOrPhone(emailOrPhone);
    if (!driver) {
      console.log("Driver not found");
      return res.status(404).json({ error: 'Invalid crcd backendedentials' });
    }

    const isMatch = await driver.isPasswordMatch(password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(driver._id, 'driver');

    res.status(200).json({
      message: 'Login successful',
      driver,
      token
    });
    console.log('driver:', driver);

  } catch (error) {
    console.error('Driver login error:', error);
    res.status(500).json({ error: 'Server error during login', details: error });
  }
};

const registerAdmin = async (req, res) => {
  res.status(505).json({
    error: "Not implmented"
  })
  // const token = generateToken(admin._id, "admin");
};

const loginAdmin = async (req, res) => {
  res.status(505).json({
    error: "Not implmented"
  })
  // const token = generateToken(admin._id, "admin");
};

const registerRestaurant = async (req, res) => {
  const {
    name, description, cuisineType,
    address, contact, openingHours
  } = req.body;

  if (!name || !description || !cuisineType || !address || !contact || !contact.email || !contact.phone || !contact.password) {
    console.log("All fields are not available for restaurant registration");
    return res.status(403).json({ error: 'Missing required fields' });
  }

  if (!validator.isEmail(contact.email)) {
    console.log("Email is not valid");
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!validator.isStrongPassword(contact.password)) {
    console.log("Password is not strong enough");
    return res.status(400).json({ error: 'Weak password' });
  }

  try {
    const existing = await Restaurant.restaurantExists(contact.email, contact.phone);
    if (existing) {
      console.log("Restaurant already exists");
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
    console.log("Driver logged in, Sucess response sent");

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration', details: err});
  }
};

// Login an existing restaurant
const loginRestaurant = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    console.log("Both phone/email and password are not available for user login");
    return res.status(403).json({ error: 'Both email/phone and password are required' });
  }

  try {
    const restaurant = await Restaurant.findByEmailOrPhone(emailOrPhone);
    if (!restaurant) {
      console.log("Restaurant not found");
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isMatch = await restaurant.isPasswordMatch(password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(restaurant._id, 'restaurant');

    res.status(200).json({
      message: 'Login successful',
      restaurant,
      token
    });
    console.log('restaurant:', restaurant);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login', details: err });
  }
};

const verifyToken = (req, res) => {
    res.status(200).json({ message: 'Token is valid', user: req.user });
};

const forgotPassword = async (req, res) => {
  const { email, role } = req.body;

  let Model;
  switch (role) {
      case 'user': Model = require('../models/User'); break;
      case 'driver': Model = require('../models/Driver'); break;
      case 'restaurant': Model = require('../models/Restaurant'); break;
      case 'admin': Model = require('../models/Admin'); break;
      default: return res.status(400).json({ error: 'Invalid role' });
  }

  const user = await Model.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = jwt.sign(
      { _id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
  );

  const resetUrl = `http://yourdomain.com/resetPassword?token=${resetToken}&role=${role}`;

  // Send email (setup nodemailer)
  const transporter = nodemailer.createTransport({ 
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
      }
  });

  await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 15 minutes.</p>`
  });

  res.json({ message: 'Password reset link sent' });
};


const resetPassword = async (req, res) => {
  const { token, password, role } = req.body;

  let Model;
  switch (role) {
      case 'user': Model = User; break;
      case 'driver': Model = Driver; break;
      case 'restaurant': Model = Restaurant; break;
      // case 'admin': Model = Admin; break;
      default: return res.status(400).json({ error: 'Invalid role' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hashedPassword = await bcrypt.hash(password, 10);

      await Model.findByIdAndUpdate(decoded._id, { password: hashedPassword });

      res.json({ message: 'Password reset successful' });
      console.log("Sucess response sent");

  } catch (err) {
      res.status(400).json({ error: 'Invalid or expired token' });
  }
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
  forgotPassword,
  resetPassword,
  verifyToken
};
