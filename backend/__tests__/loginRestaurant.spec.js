const { loginRestaurant } = require('../controllers/authController');
const Restaurant = require('../models/Restaurant');
const { generateToken } = require('../middleware/requireAuth');

jest.mock('../models/Restaurant');
jest.mock('../middleware/requireAuth');

describe('loginRestaurant', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        emailOrPhone: 'restaurant@example.com',
        password: 'correctPassword123!'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    generateToken.mockReturnValue('mockToken123');
  });

  it('should login restaurant successfully with email', async () => {
    const mockRestaurant = {
      _id: 'rest123',
      name: 'Gourmet Paradise',
      contact: {
        email: 'restaurant@example.com',
        phone: '+1234567890'
      },
      isPasswordMatch: jest.fn().mockResolvedValue(true)
    };

    Restaurant.findByEmailOrPhone.mockResolvedValue(mockRestaurant);

    await loginRestaurant(req, res);

    expect(Restaurant.findByEmailOrPhone).toHaveBeenCalledWith('restaurant@example.com');
    expect(mockRestaurant.isPasswordMatch).toHaveBeenCalledWith('correctPassword123!');
    expect(generateToken).toHaveBeenCalledWith('rest123', 'restaurant');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      restaurant: mockRestaurant,
      token: 'mockToken123'
    });
  });

  it('should login restaurant successfully with phone number', async () => {
    req.body.emailOrPhone = '+1234567890';
    const mockRestaurant = {
      _id: 'rest123',
      name: 'Gourmet Paradise',
      contact: {
        email: 'restaurant@example.com',
        phone: '+1234567890'
      },
      isPasswordMatch: jest.fn().mockResolvedValue(true)
    };

    Restaurant.findByEmailOrPhone.mockResolvedValue(mockRestaurant);

    await loginRestaurant(req, res);

    expect(Restaurant.findByEmailOrPhone).toHaveBeenCalledWith('+1234567890');
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 403 if credentials are missing', async () => {
    const testCases = [
      { emailOrPhone: undefined, password: 'password' },
      { emailOrPhone: 'restaurant@example.com', password: undefined },
      { emailOrPhone: undefined, password: undefined }
    ];

    for (const body of testCases) {
      req.body = body;
      await loginRestaurant(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ 
        error: 'Both email/phone and password are required' 
      });
      jest.clearAllMocks();
    }
  });

  it('should return 404 if restaurant is not found', async () => {
    Restaurant.findByEmailOrPhone.mockResolvedValue(null);

    await loginRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('should return 404 if password does not match', async () => {
    const mockRestaurant = {
      _id: 'rest123',
      contact: {
        email: 'restaurant@example.com'
      },
      isPasswordMatch: jest.fn().mockResolvedValue(false)
    };

    Restaurant.findByEmailOrPhone.mockResolvedValue(mockRestaurant);

    await loginRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  

  it('should handle server errors', async () => {
    Restaurant.findByEmailOrPhone.mockRejectedValue(new Error('Database error'));

    await loginRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Server error during login',
      details: expect.any(Error)
    });
  });

  it('should work with international phone numbers', async () => {
    req.body.emailOrPhone = '+447123456789';
    const mockRestaurant = {
      _id: 'rest123',
      contact: {
        phone: '+447123456789'
      },
      isPasswordMatch: jest.fn().mockResolvedValue(true)
    };

    Restaurant.findByEmailOrPhone.mockResolvedValue(mockRestaurant);

    await loginRestaurant(req, res);

    expect(Restaurant.findByEmailOrPhone).toHaveBeenCalledWith('+447123456789');
    expect(res.status).toHaveBeenCalledWith(200);
  });
});