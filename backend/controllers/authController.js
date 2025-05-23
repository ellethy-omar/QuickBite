const User = require('../models/User');
const Admin = require('../models/Admin'); // Assuming you have an Admin model
const Driver = require('../models/Driver'); // Assuming you have a Driver model
const Restaurant = require('../models/Restaurant');
const validator = require('validator');
const nodemailer = require('nodemailer');
const { generateToken } = require('../middleware/requireAuth'); // Import your JWT generator
const { decode } = require('jsonwebtoken');
const jwt     = require('jsonwebtoken');
const bcrypt      = require('bcrypt'); 

const registerUser = async (req, res) => {
    const { username, email, password, phone, addresses } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      console.log("All fields are not available for user registration");
      return res.status(403).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      console.log("Email is not valid");
      return res.status(403).json({ error: 'Invalid email address' });
    }

    if (!validator.isStrongPassword(password)) {
      console.log("Password is not strong enough");
      return res.status(403).json({ error: 'Password is not strong enough' });
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
      console.log('Registration error:', error);
      res.status(500).json({ error: 'Server error during registration', details: error });
    }
};

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
      console.log('Login error:', error);
      res.status(500).json({ error: 'Server error during login', details: error });
    }
};

const registerDriver = async (req, res) => {
  const { name, email, phone, password, vehicle } = req.body;

  if (!name || !email || !phone || !password) {
    console.log("All fields are not available for driver registration");
    return res.status(403).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    console.log("Email is not valid");
    return res.status(403).json({ error: 'Invalid email address' });
  }

  if (!validator.isStrongPassword(password)) {
    console.log("Password is not strong enough");
    return res.status(403).json({ error: 'Password is not strong enough' });
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
    console.log('Driver registration error:', error);
    res.status(500).json({ error: 'Server error during registration', details: error });
  }
};

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

    delete driver.password

    res.status(200).json({
      message: 'Login successful',
      driver,
      token
    });
    console.log('driver:', driver);

  } catch (error) {
    console.log('Driver login error:', error);
    res.status(500).json({ error: 'Server error during login', details: error });
  }
};

const registerAdmin = async (req, res) => {
  const { username, email, password, phone } = req.body;

  if (!username || !email || !password) {
    console.log("All fields are not available for admin registration");
    return res.status(403).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    console.log("Email is not valid");
    return res.status(403).json({ error: 'Invalid email address' });
  }

  if (!validator.isStrongPassword(password)) {
    console.log("Password is not strong enough");
    return res.status(403).json({ error: 'Password is not strong enough' });
  }

  try {
    const existingAdmin = await Admin.AdminExists(username, email);
    if (existingAdmin) {
      console.log("Admin already exists");
      return res.status(403).json({ error: 'Admin already exists' });
    }

    const savedAdmin = await Admin.createAdmin({ username, email, password, phone });

    const token = generateToken(savedAdmin._id, "admin");

    const adminData = savedAdmin.toObject();
    delete adminData.password;

    res.status(201).json({
      message: 'Admin registered successfully',
      admin: adminData,
      token
    });

    console.log('savedAdmin:', adminData);

  } catch (error) {
    console.log('Admin registration error:', error);
    res.status(500).json({ error: 'Server error during admin registration', details: error });
  }
};

const loginAdmin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    console.log("Both username/email and password are not available for admin login");
    return res.status(403).json({ error: 'Both username/email and password are required' });
  }

  try {
    const admin = await Admin.findByUsernameOrEmail(usernameOrEmail);
    if (!admin) {
      console.log("Admin not found");
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.isPasswordMatch(password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(admin._id, "admin");

    const adminData = admin.toObject();
    delete adminData.password;

    res.status(200).json({
      message: 'Login successful',
      admin: adminData,
      token
    });

    console.log('admin:', adminData);

  } catch (error) {
    console.log('Admin login error:', error);
    res.status(500).json({ error: 'Server error during admin login', details: error });
  }
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
    return res.status(403).json({ error: 'Invalid email address' });
  }

  if (!validator.isStrongPassword(contact.password)) {
    console.log("Password is not strong enough");
    return res.status(403).json({ error: 'Weak password' });
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

    delete newRestaurant.contact.password;

    res.status(201).json({
      message: 'Restaurant registered successfully',
      restaurant: newRestaurant,
      token
    });
    console.log("newRestaurant:", newRestaurant);

  } catch (err) {
    console.log('Register error:', err);
    res.status(500).json({ error: 'Server error during registration', details: err});
  }
};

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

    delete restaurant.contact.password;

    res.status(200).json({
      message: 'Login successful',
      restaurant,
      token
    });
    console.log('restaurant:', restaurant);
  } catch (err) {
    console.log('Login error:', err);
    res.status(500).json({ error: 'Server error during login', details: err });
  }
};

const forgotPassword = async (req, res) => {
  const { email, role } = req.body;

  let Model;

  if (!role || !email) {
    console.log("Role or email is not available for password reset");

    return res.status(403).json({ error: 'Role and email are required' });
  }
  if (!validator.isEmail(email)) {
    console.log("Email is not valid");
    return res.status(403).json({ error: 'Invalid email address' });
  }

  switch (role) {
      case 'user': Model = User; break;
      case 'driver': Model = Driver; break;
      case 'restaurant': Model = Restaurant; break;
      case 'admin': Model = Admin; break;
      default: return res.status(403).json({ error: 'Invalid role' });
  }

  const user = await Model.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = jwt.sign(
      { _id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
  );

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
      html: `<p>
        Here is the token you need 
        <br>
        ${resetToken}
        <br>
        Token expires in 15 minutes.
      </p>`
  });

  res.json({ message: 'Password reset link sent, check spam folder' });
};

const resetPassword = async (req, res) => {
  const { token, password, role } = req.body;

  let Model;
  if (!role || !token || !password) {
    console.log("Role or token or password is not available for password reset");
    return res.status(403).json({ error: 'Role, token and password are required' });
  }

  switch (role) {
      case 'user': Model = User; break;
      case 'driver': Model = Driver; break;
      case 'restaurant': Model = Restaurant; break;
      case 'admin': Model = Admin; break;
      default: return res.status(403).json({ error: 'Invalid role' });
  }

  try {

    if (!validator.isStrongPassword(password)) {
      console.log("Password is not strong enough");
      return res.status(403).json({ error: 'Password is not strong enough' });
    }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await Model.findById(decoded._id);
      if(!user)
        return res.status(404).json({error: 'user not found'});

      if(Model !== Restaurant) {
        await Model.findByIdAndUpdate(decoded._id, { password: hashedPassword });

      } else {
        
        const changedContact = user.contact;
        changedContact.password = hashedPassword
        await Model.findByIdAndUpdate(decoded._id, { contact : changedContact })
      }

      res.json({ message: 'Password reset successful, please login again' });
      console.log("Sucess response sent");

  } catch (err) {
      res.status(420).json({ error: 'Invalid or expired token' });
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
  resetPassword
};
