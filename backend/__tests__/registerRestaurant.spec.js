
const { registerRestaurant } = require('../controllers/authController');
const Restaurant = require('../models/Restaurant');
const validator = require('validator');
const { generateToken } = require('../middleware/requireAuth');


jest.mock('../models/Restaurant');
jest.mock('validator');
jest.mock('../middleware/requireAuth');


describe('registerRestaurant', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        name: 'Gourmet Paradise',
        description: 'Fine dining experience',
        cuisineType: ['French', 'Italian'],
        address: {
          street: '456 Culinary Ave',
          city: 'Gastrotown',
          area: 'Downtown'
        },
        contact: {
          email: 'info@gourmetparadise.com',
          phone: '+1122334455',
          password: 'SecurePass123!'
        },
        openingHours: {
          monday: { open: '09:00', close: '22:00' },
          tuesday: { open: '09:00', close: '22:00' }
        }
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    validator.isEmail.mockReturnValue(true);
    validator.isStrongPassword.mockReturnValue(true);
    generateToken.mockReturnValue('mockToken123');
  
  });

  it('should register a new restaurant successfully', async () => {
    const mockRestaurant = {
      _id: 'rest123',
      name: 'Gourmet Paradise',
      description: 'Fine dining experience',
      cuisineType: ['French', 'Italian'],
      address: {
        street: '456 Culinary Ave',
        city: 'Gastrotown',
        area: 'Downtown'
      },
      contact: {
        email: 'info@gourmetparadise.com',
        phone: '+1122334455'
      },
      openingHours: {
        monday: { open: '09:00', close: '22:00' },
        tuesday: { open: '09:00', close: '22:00' }
      },
      toObject: jest.fn().mockReturnValue({
        _id: 'rest123',
        name: 'Gourmet Paradise',
      
      })
    };

    Restaurant.restaurantExists.mockResolvedValue(null);
    Restaurant.createRestaurant.mockResolvedValue(mockRestaurant);

    await registerRestaurant(req, res);

    expect(Restaurant.createRestaurant).toHaveBeenCalledWith({
      name: 'Gourmet Paradise',
      description: 'Fine dining experience',
      cuisineType: ['French', 'Italian'],
      address: {
        street: '456 Culinary Ave',
        city: 'Gastrotown',
        area: 'Downtown'
      },
      contact: {
        email: 'info@gourmetparadise.com',
        phone: '+1122334455',
        password: 'SecurePass123!'
      },
      openingHours: {
        monday: { open: '09:00', close: '22:00' },
        tuesday: { open: '09:00', close: '22:00' }
      }
    });

    expect(generateToken).toHaveBeenCalledWith('rest123', 'restaurant');

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Restaurant registered successfully',
      restaurant: expect.objectContaining({
        _id: 'rest123',
        name: 'Gourmet Paradise'
      }),
      token: 'mockToken123'
    });
  });

  it('should return 403 if required fields are missing', async () => {
    const testCases = [
      { name: undefined }, 
      { description: undefined },
      { cuisineType: undefined },
      { address: undefined },
      { contact: { email: undefined, phone: '+1122334455', password: 'SecurePass123!' } },
      { contact: { email: 'info@gourmetparadise.com', phone: undefined, password: 'SecurePass123!' } },
      { contact: { email: 'info@gourmetparadise.com', phone: '+1122334455', password: undefined } }
    ];

    for (const testCase of testCases) {
      req.body = { ...req.body, ...testCase };
      await registerRestaurant(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
      jest.clearAllMocks();
    }
  });

  it('should return 400 for invalid email format', async () => {
    req.body.contact.email = 'invalid-email';
    validator.isEmail.mockReturnValue(false);

    await registerRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email address' });
  });

  it('should return 400 for weak password', async () => {
    validator.isStrongPassword.mockReturnValue(false);

    await registerRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Weak password' });
  });

  it('should return 410 if restaurant already exists', async () => {
    Restaurant.restaurantExists.mockResolvedValue(true);

    await registerRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(410);
    expect(res.json).toHaveBeenCalledWith({ error: 'Restaurant already exists' });
    expect(Restaurant.createRestaurant).not.toHaveBeenCalled();
  });

  it('should handle server errors during registration', async () => {
    Restaurant.restaurantExists.mockRejectedValue(new Error('Database error'));

    await registerRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Server error during registration',
      details: expect.any(Error)
    });
  });


});