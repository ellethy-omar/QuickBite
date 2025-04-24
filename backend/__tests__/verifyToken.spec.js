const { verifyToken } = require('../controllers/authController');

describe('verifyToken', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      user: {
        _id: 'user123',
        role: 'admin',
        email: 'admin@example.com'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should return 200 with user data when token is valid', () => {
    verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token is valid',
      user: {
        _id: 'user123',
        role: 'admin',
        email: 'admin@example.com'
      }
    });
  });

  it('should work with minimal user data', () => {
    req.user = { _id: 'user123' };
    
    verifyToken(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Token is valid',
      user: { _id: 'user123' }
    });
  });

  it('should handle missing user object', () => {
    req.user = undefined;

    verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token is valid',
      user: undefined
    });
  });

  it('should preserve all user properties in response', () => {
    req.user = {
      _id: 'user456',
      name: 'Test User',
      customField: 'customValue',
      nested: { prop: 'value' }
    };

    verifyToken(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Token is valid',
      user: {
        _id: 'user456',
        name: 'Test User',
        customField: 'customValue',
        nested: { prop: 'value' }
      }
    });
  });
});