const { loginAdmin } = require('../controllers/authController');
const Admin = require('../models/Admin');
const { generateToken } = require('../middleware/requireAuth');

jest.mock('../models/Admin');
jest.mock('../middleware/requireAuth');

describe('loginAdmin', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        usernameOrEmail: 'admin@example.com',
        password: 'correctPassword123!'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    generateToken.mockReturnValue('mockToken123');
  });

  it('should login admin successfully with email', async () => {
    const mockAdmin = {
      _id: 'admin123',
      username: 'adminUser',
      email: 'admin@example.com',
      isPasswordMatch: jest.fn().mockResolvedValue(true),
      toObject: jest.fn().mockReturnValue({
        _id: 'admin123',
        username: 'adminUser',
        email: 'admin@example.com'
      })
    };

    Admin.findByUsernameOrEmail.mockResolvedValue(mockAdmin);

    await loginAdmin(req, res);

    expect(Admin.findByUsernameOrEmail).toHaveBeenCalledWith('admin@example.com');
    expect(mockAdmin.isPasswordMatch).toHaveBeenCalledWith('correctPassword123!');
    expect(generateToken).toHaveBeenCalledWith('admin123', 'admin');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      admin: {
        _id: 'admin123',
        username: 'adminUser',
        email: 'admin@example.com'
      },
      token: 'mockToken123'
    });
  });

  it('should login admin successfully with username', async () => {
    req.body.usernameOrEmail = 'adminUser';
    const mockAdmin = {
      _id: 'admin123',
      username: 'adminUser',
      isPasswordMatch: jest.fn().mockResolvedValue(true),
      toObject: jest.fn().mockReturnValue({
        _id: 'admin123',
        username: 'adminUser'
      })
    };

    Admin.findByUsernameOrEmail.mockResolvedValue(mockAdmin);

    await loginAdmin(req, res);

    expect(Admin.findByUsernameOrEmail).toHaveBeenCalledWith('adminUser');
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return 403 if credentials are missing', async () => {
    const testCases = [
      { usernameOrEmail: undefined, password: 'password' },
      { usernameOrEmail: 'admin@example.com', password: undefined },
      { usernameOrEmail: undefined, password: undefined }
    ];

    for (const body of testCases) {
      req.body = body;
      await loginAdmin(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ 
        error: 'Both username/email and password are required' 
      });
      jest.clearAllMocks();
    }
  });

  it('should return 404 if admin is not found', async () => {
    Admin.findByUsernameOrEmail.mockResolvedValue(null);

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('should return 404 if password does not match', async () => {
    const mockAdmin = {
      _id: 'admin123',
      isPasswordMatch: jest.fn().mockResolvedValue(false)
    };

    Admin.findByUsernameOrEmail.mockResolvedValue(mockAdmin);

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('should remove password from response', async () => {
    const mockAdmin = {
      _id: 'admin123',
      email: 'admin@example.com',
      password: 'hashedPassword',
      isPasswordMatch: jest.fn().mockResolvedValue(true),
      toObject: jest.fn().mockReturnValue({
        _id: 'admin123',
        email: 'admin@example.com',
        password: 'hashedPassword'
      })
    };

    Admin.findByUsernameOrEmail.mockResolvedValue(mockAdmin);

    await loginAdmin(req, res);

    const responseAdmin = res.json.mock.calls[0][0].admin;
    expect(responseAdmin.password).toBeUndefined();
  });

  it('should handle server errors', async () => {
    Admin.findByUsernameOrEmail.mockRejectedValue(new Error('Database error'));

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Server error during admin login',
      details: expect.any(Error)
    });
  });
});