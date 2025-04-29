const { loginUser } = require('../controllers/authController');
const User = require('../models/User');
const { generateToken } = require('../middleware/requireAuth');

jest.mock('../models/User');
jest.mock('../middleware/requireAuth');

const req = {
    body: {
      usernameOrEmail: 'testuser',
      password: 'correctPassword123!'
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

generateToken.mockReturnValue('mockToken123');

it('should login user successfully with correct credentials', async () => {
    const mockUser = {
      _id: '123',
      username: 'testuser',
      email: 'test@example.com',
      isPasswordMatch: jest.fn().mockResolvedValue(true)
    };

    User.findByUsernameOrEmail.mockResolvedValue(mockUser);

    await loginUser(req, res);

    expect(User.findByUsernameOrEmail).toHaveBeenCalledWith('testuser');
    expect(mockUser.isPasswordMatch).toHaveBeenCalledWith('correctPassword123!');
    expect(generateToken).toHaveBeenCalledWith('123', 'user');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      user: mockUser,
      token: 'mockToken123'
    });
  });

  it('should return 403 if username/email or password is missing', async () => {
    const testCases = [
      { usernameOrEmail: undefined, password: 'password' },
      { usernameOrEmail: 'testuser', password: undefined },
      { usernameOrEmail: undefined, password: undefined }
    ];

    for (const body of testCases) {
      req.body = body;
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ 
        error: 'Both username/email and password are required' 
      });
      jest.clearAllMocks();
    }
  });

  it('should return 404 if user is not found', async () => {
    User.findByUsernameOrEmail.mockResolvedValue(null);

    const req = {
        body: {
          usernameOrEmail: 'testuser',
          password: 'correctPassword123!'
        }
    };

    await loginUser(req, res);

    expect(User.findByUsernameOrEmail).toHaveBeenCalledWith('testuser');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('should return 404 if password does not match', async () => {
    const mockUser = {
      _id: '123',
      username: 'testuser',
      email: 'test@example.com',
      isPasswordMatch: jest.fn().mockResolvedValue(false)
    };

    User.findByUsernameOrEmail.mockResolvedValue(mockUser);

    const req = {
        body: {
          usernameOrEmail: 'testuser',
          password: 'correctPassword123!'
        }
    };

    await loginUser(req, res);

    expect(mockUser.isPasswordMatch).toHaveBeenCalledWith('correctPassword123!');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });