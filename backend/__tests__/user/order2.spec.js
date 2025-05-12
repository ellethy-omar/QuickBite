const { cancelOrder, getMyOrders, getMyCurrentOrder, getAllRestaurants, getProductsForRestaurant } = require('../../controllers/user/ordersContorller');
const Order = require('../../models/Order');
const Restaurant = require('../../models/Restaurant');
const Product = require('../../models/Product');

jest.mock('../../models/Order');
jest.mock('../../models/Restaurant');
jest.mock('../../models/Product');

describe('Order Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      user: { _id: 'user123' },
      query: {},
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('cancelOrder', () => {
    

    it('should return 403 if orderID is missing', async () => {
      await cancelOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    
  });

  describe('getMyOrders', () => {
    it('should fetch all user orders', async () => {
      const mockOrders = [{ _id: 'order1' }, { _id: 'order2' }];
      Order.findOrdersByUserId.mockResolvedValue(mockOrders);

      await getMyOrders(req, res);

      expect(Order.findOrdersByUserId).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "All orders fetched successfully",
        data: mockOrders
      });
    });

    it('should handle database errors', async () => {
      Order.findOrdersByUserId.mockRejectedValue(new Error('DB error'));

      await getMyOrders(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getMyCurrentOrder', () => {
    it('should return current pending order', async () => {
      const mockOrder = { _id: 'order123', status: 'pending' };
      Order.findOne.mockResolvedValue(mockOrder);

      await getMyCurrentOrder(req, res);

      expect(Order.findOne).toHaveBeenCalledWith({
        userID: 'user123',
        status: { $in: ['pending', 'processing'] }
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should handle no current order', async () => {
      Order.findOne.mockResolvedValue(null);

      await getMyCurrentOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No current order found.',
        order: null
      });
    });

    it('should handle database errors', async () => {
      Order.findOne.mockRejectedValue(new Error('DB error'));

      await getMyCurrentOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getAllRestaurants', () => {
    it('should return all restaurants', async () => {
      const mockRestaurants = [{ _id: 'rest1' }, { _id: 'rest2' }];
      Restaurant.find.mockResolvedValue(mockRestaurants);

      await getAllRestaurants(req, res);

      expect(Restaurant.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "All restaurants fetched successfully",
        data: mockRestaurants
      });
    });

    it('should handle no restaurants found', async () => {
      Restaurant.find.mockResolvedValue(null);

      await getAllRestaurants(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "No restaurants found",
        data: []
      });
    });
  });

  describe('getProductsForRestaurant', () => {
    

    it('should return 403 if restaurantID missing', async () => {
      await getProductsForRestaurant(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 if restaurant not found', async () => {
      req.query.restraurantID = 'rest123';
      Restaurant.findById.mockResolvedValue(null);

      await getProductsForRestaurant(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    
  });
});