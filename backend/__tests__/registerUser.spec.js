const { registerUser } = require('../controllers/authController'); 
const User = require('../models/User');
const validator = require('validator');
const { generateToken } = require('../middleware/requireAuth');

// Mock the modules
jest.mock('../models/User');
jest.mock('validator');
jest.mock('../middleware/requireAuth');

const req = {
    body: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'StrongPassword123!',
      phone: '1234567890',
      addresses: ['123 Main St']
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

validator.isEmail.mockReturnValue(true);
validator.isStrongPassword.mockReturnValue(true);
generateToken.mockReturnValue('mockToken123');

it('should register a new user successfully', async () => {
    // Mock User.userExists to return false (user doesn't exist)
    User.userExists.mockResolvedValue(false);
    
    // Mock User.createUser to return a mock user
    const mockUser = {
      _id: '123',
      username: 'testuser',
      email: 'test@example.com',
      phone: '1234567890',
      addresses: ['123 Main St']
    };
    User.createUser.mockResolvedValue(mockUser);

    await registerUser(req, res);

    // Verify User.userExists was called with correct arguments
    expect(User.userExists).toHaveBeenCalledWith('testuser', 'test@example.com');
    
    // Verify User.createUser was called with correct arguments
    expect(User.createUser).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'StrongPassword123!',
      phone: '1234567890',
      addresses: ['123 Main St']
    });

    // Verify generateToken was called with correct arguments
    expect(generateToken).toHaveBeenCalledWith('123', 'user');

    // Verify response
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      user: {
        _id: '123',
        name: undefined, // backend uses 'name' but the mock uses 'username'
        email: 'test@example.com',
        phone: '1234567890',
        addresses: ['123 Main St']
      },
      token: 'mockToken123'
    });
  });

it('should return 403 if required fields are missing', async () => {
    
    const testCases = [
      { username: undefined, email: 'test@example.com', password: 'StrongPassword123!' },
      { username: 'testuser', email: undefined, password: 'StrongPassword123!' },
      { username: 'testuser', email: 'test@example.com', password: undefined }
    ];

    for (const body of testCases) {
      req.body = body;
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required' });
      jest.clearAllMocks(); // Clear mocks between test cases
    }
  });

it('should return 400 for invalid email', async () => {
    validator.isEmail.mockReturnValue(false);
    const invalidEmailReq = {
      body: {
        username: 'testuser',
        email: 'test',
        password: 'StrongPassword123!',
        phone: '1234567890',
        addresses: ['123 Main St']
      }
    };
    await registerUser(invalidEmailReq, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email address' });
  });

  it('should return 400 for weak password', async () => {
    validator.isEmail.mockReturnValue(true);
    validator.isStrongPassword.mockReturnValue(false);
    const invalidPassReq = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: '1',
        phone: '1234567890',
        addresses: ['123 Main St']
      }
    };
    await registerUser(invalidPassReq, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Password is not strong enough' });
  });

  it('should return 403 if user already exists', async () => {
    validator.isStrongPassword.mockReturnValue(true);
    validator.isEmail.mockReturnValue(true);
    const invalidUserReq = {
      body: {
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'StrongPassword123!',
        phone: '1234567890',
        addresses: ['123 Main St']
      }
    };

    // Mock that user exists
    User.userExists.mockResolvedValue(true);

    await registerUser(invalidUserReq, res);

    // Verify the checks
    expect(User.userExists).toHaveBeenCalledWith('existinguser', 'existing@example.com');
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
    expect(User.createUser).not.toHaveBeenCalled();
  });
