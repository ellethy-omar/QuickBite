const { registerAdmin } = require('../controllers/authController');
const Admin = require('../models/Admin');
const validator = require('validator');
const { generateToken } = require('../middleware/requireAuth');

jest.mock('../models/Admin');
jest.mock('validator');
jest.mock('../middleware/requireAuth');

const req = {
    body: {
      username: 'adminUser',
      email: 'admin@example.com',
      password: 'StrongPass123!',
      phone: '1234567890'
    }
  };

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  validator.isEmail.mockReturnValue(true);
  validator.isStrongPassword.mockReturnValue(true);
  generateToken.mockReturnValue('mockToken123');

  it('should register a new admin successfully', async () => {
    const mockSavedAdmin = {
      _id: 'admin123',
      username: 'adminUser',
      email: 'admin@example.com',
      phone: '1234567890',
      toObject: jest.fn().mockReturnValue({
        _id: 'admin123',
        username: 'adminUser',
        email: 'admin@example.com',
        phone: '1234567890'
      })
    };

    Admin.AdminExists.mockResolvedValue(false);
    Admin.createAdmin.mockResolvedValue(mockSavedAdmin);

    await registerAdmin(req, res);

    expect(Admin.AdminExists).toHaveBeenCalledWith('adminUser', 'admin@example.com');
    expect(Admin.createAdmin).toHaveBeenCalledWith({
      username: 'adminUser',
      email: 'admin@example.com',
      password: 'StrongPass123!',
      phone: '1234567890'
    });
    expect(generateToken).toHaveBeenCalledWith('admin123', 'admin');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Admin registered successfully',
      admin: {
        _id: 'admin123',
        username: 'adminUser',
        email: 'admin@example.com',
        phone: '1234567890'
      },
      token: 'mockToken123'
    });
  });

  it('should return 403 if required fields are missing', async () => {
    const testCases = [
      { username: undefined, email: 'admin@example.com', password: 'StrongPass123!' },
      { username: 'adminUser', email: undefined, password: 'StrongPass123!' },
      { username: 'adminUser', email: 'admin@example.com', password: undefined }
    ];

    for (const body of testCases) {
      req.body = body;
      await registerAdmin(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required' });
      jest.clearAllMocks();
    }
  });
  it('should return 400 for invalid email', async () => {
    validator.isEmail.mockReturnValue(false);
    const req = {
        body: {
          username: 'adminUser',
          email: 'admin@example.com',
          password: 'StrongPass123!',
          phone: '1234567890'
        }
      };
    await registerAdmin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email address' });
  });

  it('should return 400 for weak password', async () => {
    const req = {
        body: {
          username: 'adminUser',
          email: 'admin@example.com',
          password: 'StrongPass123!',
          phone: '1234567890'
        }
      };
    validator.isStrongPassword.mockReturnValue(false);
    validator.isEmail.mockReturnValue(true);
    await registerAdmin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Password is not strong enough' });
  });

  it('should return 403 if admin already exists', async () => {
    Admin.AdminExists.mockResolvedValue(true);
    validator.isStrongPassword.mockReturnValue(true);

    const invalidUserReq = {
        body: {
          username: 'existinguser',
          email: 'existing@example.com',
          password: 'StrongPassword123!',
          phone: '1234567890'
          
        }
      };
    await registerAdmin(invalidUserReq, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Admin already exists' });
    expect(Admin.createAdmin).not.toHaveBeenCalled();
  });