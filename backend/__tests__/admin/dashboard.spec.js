const {
  getAllUsers,
  getAllDrivers,
  getAllRestaurants,
  getAllProductsOfCertainRestaurant,
  sendWarningToUser,
  sendWarningToDriver,
  sendWarningToRestaurant
} = require('../../controllers/admin/dashboardController');
const User = require('../../models/User');
const Driver = require('../../models/Driver');
const Restaurant = require('../../models/Restaurant');
const Product = require('../../models/Product');

jest.mock('../../models/User');
jest.mock('../../models/Driver');
jest.mock('../../models/Restaurant');
jest.mock('../../models/Product');

describe('Admin Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      params: {},
      query: {},
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAllUsers', () => {
    it('should fetch all users successfully', async () => {
      const mockUsers = [{ _id: 'user1' }, { _id: 'user2' }];
      User.find.mockResolvedValue(mockUsers);

      await getAllUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle database errors', async () => {
      User.find.mockRejectedValue(new Error('Database error'));

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Server error while fetching users.'
      });
    });
  });

  describe('getAllDrivers', () => {
    it('should fetch all drivers successfully', async () => {
      const mockDrivers = [{ _id: 'driver1' }, { _id: 'driver2' }];
      Driver.find.mockResolvedValue(mockDrivers);

      await getAllDrivers(req, res);

      expect(Driver.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockDrivers);
    });

    it('should handle database errors', async () => {
      Driver.find.mockRejectedValue(new Error('Database error'));

      await getAllDrivers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Server error while fetching drivers.'
      });
    });
  });

  describe('getAllRestaurants', () => {
    it('should fetch all restaurants successfully', async () => {
      const mockRestaurants = [{ _id: 'rest1' }, { _id: 'rest2' }];
      Restaurant.find.mockResolvedValue(mockRestaurants);

      await getAllRestaurants(req, res);

      expect(Restaurant.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockRestaurants);
    });

    it('should handle database errors', async () => {
      Restaurant.find.mockRejectedValue(new Error('Database error'));

      await getAllRestaurants(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Server error while fetching restaurants.'
      });
    });
  });

  describe('getAllProductsOfCertainRestaurant', () => {
    it('should fetch products for valid restaurant', async () => {
      req.query.restraurantID = 'rest123';
      const mockRestaurant = { _id: 'rest123' };
      const mockProducts = [{ _id: 'prod1' }, { _id: 'prod2' }];
      
      Restaurant.findById.mockResolvedValue(mockRestaurant);
      Product.find.mockResolvedValue(mockProducts);

      await getAllProductsOfCertainRestaurant(req, res);

      expect(Restaurant.findById).toHaveBeenCalledWith('rest123');
      expect(Product.find).toHaveBeenCalledWith({ restaurantId: 'rest123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "All products fetched successfully",
        data: mockProducts
      });
    });

    it('should return 403 if restaurantID missing', async () => {
      await getAllProductsOfCertainRestaurant(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 if restaurant not found', async () => {
      req.query.restraurantID = 'rest123';
      Restaurant.findById.mockResolvedValue(null);

      await getAllProductsOfCertainRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return empty array if no products found', async () => {
      req.query.restraurantID = 'rest123';
      Restaurant.findById.mockResolvedValue({ _id: 'rest123' });
      Product.find.mockResolvedValue(null);

      await getAllProductsOfCertainRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "No products found for this restaurant",
        data: []
      });
    });
  });

  describe('sendWarningToUser', () => {
    

    it('should return 403 if message or userId missing', async () => {
      req.body = { message: 'Test warning' };
      await sendWarningToUser(req, res);
      expect(res.status).toHaveBeenCalledWith(403);

      req.body = { userId: 'user123' };
      await sendWarningToUser(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 if user not found', async () => {
      req.body = { message: 'Test warning', userId: 'user123' };
      User.findById.mockResolvedValue(null);

      await sendWarningToUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('sendWarningToDriver', () => {
    
    it('should return 403 if message or driverId missing', async () => {
      req.body = { message: 'Test warning' };
      await sendWarningToDriver(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 if driver not found', async () => {
      req.body = { message: 'Test warning', driverId: 'driver123' };
      Driver.findById.mockResolvedValue(null);

      await sendWarningToDriver(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('sendWarningToRestaurant', () => {

    it('should return 403 if message or restaurantId missing', async () => {
      req.body = { message: 'Test warning' };
      await sendWarningToRestaurant(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 if restaurant not found', async () => {
      req.body = { message: 'Test warning', restaurantId: 'rest123' };
      Restaurant.findById.mockResolvedValue(null);

      await sendWarningToRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});