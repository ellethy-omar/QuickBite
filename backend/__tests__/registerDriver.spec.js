const { registerDriver } = require('../controllers/authController');
const Driver = require('../models/Driver');
const validator = require('validator');
const { generateToken } = require('../middleware/requireAuth');

jest.mock('../models/Driver');
jest.mock('validator');
jest.mock('../middleware/requireAuth');

const req = {
    body: {
        name: 'John Driver',
        email: 'john.driver@example.com',
        phone: 1234567890,
        password: 'SecurePass123!',
        vehicle: {
            color: 'red',
            plateNumber: 'XYZ123',
            type: 'motorcycle',
        }
    }
  };

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

  validator.isEmail.mockReturnValue(true);
  validator.isStrongPassword.mockReturnValue(true);
  generateToken.mockReturnValue('mockJWTToken');


  it('should register a new driver successfully with vehicle details', async () => {
    const mockSavedDriver = {
      _id: 'driver123',
      name: 'John Driver',
      email: 'john.driver@example.com',
      phone: 1234567890,
      vehicle: {
        color: 'red',
        plateNumber: 'XYZ123',
        type: 'motorcycle',
      },
      save: jest.fn().mockResolvedValue(this)
    };

    Driver.driverExists.mockResolvedValue(null);
    Driver.createDriver.mockResolvedValue(mockSavedDriver);

    await registerDriver(req, res);

    expect(Driver.createDriver).toHaveBeenCalledWith({
      name: 'John Driver',
      email: 'john.driver@example.com',
      phone: 1234567890,
      password: 'SecurePass123!',
      vehicle: {
        color: 'red',
        plateNumber: 'XYZ123',
        type: 'motorcycle',
      }
    });

    expect(generateToken).toHaveBeenCalledWith('driver123', 'driver');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Driver registered successfully',
      driver: mockSavedDriver,
      token: 'mockJWTToken'
    });
  });

  it('should register driver without optional vehicle details', async () => {
    delete req.body.vehicle;
    const mockSavedDriver = {
      _id: 'driver123',
      name: 'John Driver',
      email: 'john.driver@example.com',
      phone: 1234567890
    };

    Driver.driverExists.mockResolvedValue(null);
    Driver.createDriver.mockResolvedValue(mockSavedDriver);

    await registerDriver(req, res);

    expect(Driver.createDriver).toHaveBeenCalledWith({
      name: 'John Driver',
      email: 'john.driver@example.com',
      phone: 1234567890,
      password: 'SecurePass123!',
      vehicle: undefined
    });
  });
  it('should return 410 if driver exists by email', async () => {
    const existingDriver = {
      _id: 'existing123',
      email: 'john.driver@example.com'
    };
    Driver.driverExists.mockResolvedValue(existingDriver);

    await registerDriver(req, res);

    expect(res.status).toHaveBeenCalledWith(410);
    expect(res.json).toHaveBeenCalledWith({ error: 'Driver already exists' });
    expect(Driver.createDriver).not.toHaveBeenCalled();
  });
  it('should return 410 if driver exists by phone', async () => {
    const existingDriver = {
      _id: 'existing123',
      phone: 1234567890
    };
    Driver.driverExists.mockResolvedValue(existingDriver);

    await registerDriver(req, res);

    expect(res.status).toHaveBeenCalledWith(410);
    expect(res.json).toHaveBeenCalledWith({ error: 'Driver already exists' });
  });

  
  it('should return 400 for invalid email', async () => {
    validator.isEmail.mockReturnValue(false);
    await registerDriver(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email address' });
  });

  it('should return 400 for weak password', async () => {
    validator.isStrongPassword.mockReturnValue(false);
    validator.isEmail.mockReturnValue(true);
    await registerDriver(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Password is not strong enough' });
  });

  it('should return 403 if required fields are missing', async () => {
    const testCases = [
      { name: undefined, email: 'john@example.com', phone: '1234567890', password: 'StrongPass123!' },
      { name: 'John Doe', email: undefined, phone: '1234567890', password: 'StrongPass123!' },
      { name: 'John Doe', email: 'john@example.com', phone: undefined, password: 'StrongPass123!' },
      { name: 'John Doe', email: 'john@example.com', phone: '1234567890', password: undefined }
    ];

    for (const body of testCases) {
      req.body = body;
      await registerDriver(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required' });
      jest.clearAllMocks(); 
    }
  });
