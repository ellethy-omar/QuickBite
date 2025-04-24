const { loginDriver } = require('../controllers/authController');
const Driver = require('../models/Driver');
const validator = require('validator');
const { generateToken } = require('../middleware/requireAuth');

jest.mock('../models/Driver');
jest.mock('../middleware/requireAuth');
jest.mock('validator');

const req = {
    body: {
      emailOrPhone: 'test@example.com',
      password: 'correctPassword123!'
    }
  };

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};
  validator.isEmail.mockReturnValue(true);
  generateToken.mockReturnValue('mockToken123');

  it('should login driver successfully with email', async () => {
    const mockDriver = {
      _id: 'driver123',
      email: 'test@example.com',
      isPasswordMatch: jest.fn().mockResolvedValue(true)
    };

    Driver.findByEmailOrPhone.mockResolvedValue(mockDriver);

    await loginDriver(req, res);

    expect(validator.isEmail).toHaveBeenCalledWith('test@example.com');
    expect(Driver.findByEmailOrPhone).toHaveBeenCalledWith('test@example.com');
    expect(mockDriver.isPasswordMatch).toHaveBeenCalledWith('correctPassword123!');
    expect(generateToken).toHaveBeenCalledWith('driver123', 'driver');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      driver: mockDriver,
      token: 'mockToken123'
    });
  });

  it('should login driver successfully with phone number', async () => {
    req.body.emailOrPhone = '1234567890';
    validator.isEmail.mockReturnValue(false);

    const mockDriver = {
      _id: 'driver123',
      phone: '1234567890',
      isPasswordMatch: jest.fn().mockResolvedValue(true)
    };

    Driver.findByEmailOrPhone.mockResolvedValue(mockDriver);

    await loginDriver(req, res);

    expect(validator.isEmail).toHaveBeenCalledWith('1234567890');
    expect(Driver.findByEmailOrPhone).toHaveBeenCalledWith('1234567890');
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 403 if email/phone or password is missing', async () => {
    const testCases = [
      { emailOrPhone: undefined, password: 'password' },
      { emailOrPhone: 'test@example.com', password: undefined },
      { emailOrPhone: undefined, password: undefined }
    ];

    for (const body of testCases) {
      req.body = body;
      await loginDriver(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ 
        error: 'Both email/phone and password are required' 
      });
      jest.clearAllMocks();
    }
  });

  

  it('should return 403 if emailOrPhone is neither email nor phone', async () => {
    
    validator.isEmail.mockReturnValue(false);

    const invalidreq = {
        body: {
          emailOrPhone: 'invalid',
          password: 'correctPassword123!'
        }
      };

    await loginDriver(invalidreq, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ 
      error: 'emailOrPhone is not an email or a phone number' 
    });
  });


  it('should return 404 if driver is not found', async () => {
    Driver.findByEmailOrPhone.mockResolvedValue(null);
    validator.isEmail.mockReturnValue(true);

    const notFoundreq = {
        body: {
          emailOrPhone: 'test@example.com',
          password: 'correctPassword123!'
        }
      };

    await loginDriver(notFoundreq, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid crcd backendedentials' });
  });

  it('should return 404 if password does not match', async () => {
    const mockDriver = {
        _id: 'driver123',
        email: 'test@example.com',
        isPasswordMatch: jest.fn().mockResolvedValue(false) 
    };

    const notFoundreq = {
        body: {
          emailOrPhone: 'test@example.com',
          password: 'correctPassword123!'
        }
      };

    Driver.findByEmailOrPhone.mockResolvedValue(mockDriver);
    await loginDriver(notFoundreq, res);

    expect(Driver.findByEmailOrPhone).toHaveBeenCalledWith('test@example.com');
    expect(mockDriver.isPasswordMatch).toHaveBeenCalledWith('correctPassword123!');
    
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ 
        error: 'Invalid credentials' 
    });
});

