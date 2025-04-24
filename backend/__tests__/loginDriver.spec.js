const { loginDriver } = require('../controllers/authController');
const Driver = require('../models/Driver');
const { generateToken } = require('../middleware/requireAuth');

jest.mock('../models/Driver');
jest.mock('../middleware/requireAuth');