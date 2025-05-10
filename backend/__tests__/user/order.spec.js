const { createOrder, updateOrder } = require('../../controllers/user/ordersContorller');
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
    
    // Base request/response setup
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

  describe('createOrder', () => {
    it('should create order successfully', async () => {
      req.body = {
        restaurantID: 'rest123',
        items: [{ productID: 'prod1', quantity: 2 }]
      };
      
      Restaurant.findById.mockResolvedValue({ _id: 'rest123' });
      Order.findOne.mockResolvedValue(null);
      Order.createOrder.mockResolvedValue({ _id: 'order123' });

      await createOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(Order.createOrder).toHaveBeenCalled();
    });
    

    it('should return 403 for missing/invalid parameters', async () => {
        const testCases = [
            { orderId: undefined, items: [{ productID: 'p1', quantity: 1 }] },
            { orderId: 'order123', items: undefined },
            { orderId: 'order123', items: [] },
            { orderId: 'order123', items: 'not an array' }
        ];

        for (const body of testCases) {
            req.body = body;
            await updateOrder(req, res);
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
            error: "Missing order ID or items are invalid."
            });
        jest.clearAllMocks();
        }
    });

    it('should return 404 if restaurant does not exist', async () => {
        Restaurant.findById.mockResolvedValue(null);
        req.body = {
        restaurantID: 'rest123',
        items: [{ productID: 'prod1', quantity: 2 }]
      };
        await createOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });

    // Add other createOrder tests...
    it('should return 403 if user has existing pending order', async () => {
        req.body = {
        restaurantID: 'rest123',
        items: [{ productID: 'prod1', quantity: 2 }]
        };
        Restaurant.findById.mockResolvedValue({ _id: 'rest123' });
        Order.findOne.mockResolvedValue({ _id: 'existingOrder', status: 'pending' });

        await createOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            error: expect.any(String),
            existingOrder: expect.any(Object)
        });
    });
  }); //end of CreateOrder functions




  describe('updateOrder', () => {
    it('should update order items successfully', async () => {
        req.body = {
        orderId: 'order123',
        items: [{ productID: 'prod1', quantity: 3 }]
      };

      const mockOrder = {
        _id: 'order123',
        userID: 'user123',
        status: 'pending',
        save: jest.fn().mockResolvedValue(true)
      };

      Order.findById.mockResolvedValue(mockOrder);
      Order.validateOrder.mockResolvedValue({ isValid: true });

      await updateOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockOrder.save).toHaveBeenCalled();
    });

    // Add other updateOrder tests...

    it('should return 403 for unauthorized user', async () => {
        req.body = {
        orderId: 'order123',
        items: [{ productID: 'prod1', quantity: 3 }]
      };
     const mockOrder = {
      _id: 'order123',
      userID: 'otherUser',
      status: 'pending'
    };

        Order.findById.mockResolvedValue(mockOrder);

        await updateOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
        error: "You are not authorized to update this order."
        });
    });

    it('should return 404 if order not found', async () => {
        req.body = {
        orderId: 'order123',
        items: [{ productID: 'prod1', quantity: 3 }]
      };
        Order.findById.mockResolvedValue(null);

        await updateOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
        error: "Order not found."
        });
    });

    it('should return 403 if user has existing processing order', async () => {
        Restaurant.findById.mockResolvedValue({ _id: 'rest123' });
        Order.findOne.mockResolvedValue({ _id: 'existingOrder', status: 'processing' });
        await createOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 403 for delivered/cancelled orders', async () => {
        req.body = {
        orderId: 'order123',
        items: [{ productID: 'prod1', quantity: 3 }]
      };
        const statuses = ['delivered', 'cancelled'];
    
        for (const status of statuses) {
        const mockOrder = {
        _id: 'order123',
        userID: 'user123',
        status: status
      };

      Order.findById.mockResolvedValue(mockOrder);
      await updateOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: `Cannot update an order that is ${status}.`
      });
      jest.clearAllMocks();
    }
  });

    it('should return 403 for invalid order items', async () => {
        req.body = {
        orderId: 'order123',
        items: [{ productID: 'prod1', quantity: 3 }]
      };
        const mockOrder = {
        _id: 'order123',
        userID: 'user123',
        status: 'pending',
        restaurantID: 'restaurant123'
        };

        Order.findById.mockResolvedValue(mockOrder);
        Order.validateOrder.mockResolvedValue({
        isValid: false,
        error: "Invalid items",
        missingProducts: ['product99']
        });

        await updateOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
        error: "Invalid items",
        missingProducts: ['product99']
        });
    });

  }); //end of all updateOrder functions

  
  // Shared test cases can go here
  describe('Common Validation', () => {
    it('both should reject empty items array', async () => {
      // Test createOrder
      req.body = { restaurantID: 'rest123', items: [] };
      await createOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(403);

      // Test updateOrder
      req.body = { orderId: 'order123', items: [] };
      await updateOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });
  }); //end of common validation


});