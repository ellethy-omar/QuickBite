const {
  banUser,
  banDriver,
  banRestaurant,
  unBanUser,
  unBanDriver,
  unBanRestaurant
} = require('../../controllers/admin/banContoller');
const User = require('../../models/User');
const Driver = require('../../models/Driver');
const Restaurant = require('../../models/Restaurant');

jest.mock('../../models/User');
jest.mock('../../models/Driver');
jest.mock('../../models/Restaurant');

describe('Admin Ban/Unban Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      query: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('Ban Functions', () => {
    const testBanFunction = (func, model, type) => {
      it(`should ban ${type} successfully`, async () => {
        req.query[`${type}Id`] = '123';
        const mockEntity = { _id: '123', isBanned: false, save: jest.fn().mockResolvedValue(true) };
        model.findById.mockResolvedValue(mockEntity);

        await func(req, res);

        expect(model.findById).toHaveBeenCalledWith('123');
        expect(mockEntity.isBanned).toBe(true);
        expect(mockEntity.save).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
          message: `${type.charAt(0).toUpperCase() + type.slice(1)} has been banned.`
        });
      });

      it(`should return 400 if ${type}Id is missing`, async () => {
        await func(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          error: 'Order ID is required'
        });
      });

      it(`should return 404 if ${type} not found`, async () => {
        req.query[`${type}Id`] = '123';
        model.findById.mockResolvedValue(null);

        await func(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found.`
        });
      });

      it(`should handle database errors when banning ${type}`, async () => {
        req.query[`${type}Id`] = '123';
        model.findById.mockRejectedValue(new Error('Database error'));

        await func(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: `Server error while banning ${type}.`
        });
      });
    };

    describe('banUser', () => testBanFunction(banUser, User, 'user'));
    describe('banDriver', () => testBanFunction(banDriver, Driver, 'driver'));
    describe('banRestaurant', () => testBanFunction(banRestaurant, Restaurant, 'restaurant'));
  });

  describe('Unban Functions', () => {
    const testUnbanFunction = (func, model, type) => {
      it(`should unban ${type} successfully`, async () => {
        req.query[`${type}Id`] = '123';
        const mockEntity = { _id: '123', isBanned: true, save: jest.fn().mockResolvedValue(true) };
        model.findById.mockResolvedValue(mockEntity);

        await func(req, res);

        expect(model.findById).toHaveBeenCalledWith('123');
        expect(mockEntity.isBanned).toBe(false);
        expect(mockEntity.save).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
          message: `${type.charAt(0).toUpperCase() + type.slice(1)} has been banned.`
        });
      });

      it(`should return 400 if ${type}Id is missing`, async () => {
        await func(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          error: 'Order ID is required'
        });
      });

      it(`should return 404 if ${type} not found`, async () => {
        req.query[`${type}Id`] = '123';
        model.findById.mockResolvedValue(null);

        await func(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found.`
        });
      });

      it(`should handle database errors when unbanning ${type}`, async () => {
        req.query[`${type}Id`] = '123';
        model.findById.mockRejectedValue(new Error('Database error'));

        await func(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: `Server error while banning ${type}.`
        });
      });
    };

    describe('unBanUser', () => testUnbanFunction(unBanUser, User, 'user'));
    describe('unBanDriver', () => testUnbanFunction(unBanDriver, Driver, 'driver'));
    describe('unBanRestaurant', () => testUnbanFunction(unBanRestaurant, Restaurant, 'restaurant'));
  });

  // Note: There appears to be a copy-paste error in the original controller where 
  // the unban functions return "has been banned" message instead of "has been unbanned"
  // This should be fixed in the controller code
});