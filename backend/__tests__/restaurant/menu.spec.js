const {
  getRestaurantProducts,
  addRestaurantProduct,
  editRestaurantProduct,
  editRestaurantProductImage,
  deleteProduct
} = require('../../controllers/restaurant/menuController');
const Product = require('../../models/Product');
const { uploadBase64Image } = require('../../controllers/cloudinaryController');

jest.mock('../../models/Product');
jest.mock('../../controllers/cloudinaryController');

describe('Restaurant Product Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      user: { _id: 'restaurant123' },
      query: {},
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getRestaurantProducts', () => {
    it('should fetch all products for a restaurant', async () => {
      const mockProducts = [
        { _id: 'prod1', name: 'Product 1' },
        { _id: 'prod2', name: 'Product 2' }
      ];
      Product.find.mockResolvedValue(mockProducts);

      await getRestaurantProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith({ restaurantId: 'restaurant123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "products are in an array",
        data: mockProducts
      });
    });

    it('should handle errors when fetching products', async () => {
      Product.find.mockRejectedValue(new Error('Database error'));

      await getRestaurantProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch products",
        details: "Database error"
      });
    });
  });

  describe('addRestaurantProduct', () => {
    it('should create a new product with valid data', async () => {
      req.body = {
        name: 'New Product',
        description: 'Test description',
        price: 10.99,
        category: 'food',
        isAvailable: true,
        stockAvailable: 50
      };

      const mockProduct = { ...req.body, _id: 'newProd', restaurantId: 'restaurant123' };
      Product.prototype.save.mockResolvedValue(mockProduct);

      await addRestaurantProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should reject missing required fields', async () => {
      req.body = { name: 'Incomplete Product' };
      await addRestaurantProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should reject invalid price', async () => {
      req.body = {
        name: 'New Product',
        description: 'Test',
        price: 0,
        category: 'food',
        isAvailable: true,
        stockAvailable: 50
      };
      await addRestaurantProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should reject invalid stock', async () => {
      req.body = {
        name: 'New Product',
        description: 'Test',
        price: 10,
        category: 'food',
        isAvailable: true,
        stockAvailable: -5
      };
      await addRestaurantProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });
  });

  describe('editRestaurantProduct', () => {
    it('should update product with valid data', async () => {
      req.body = {
        _id: 'prod123',
        name: 'Updated Name',
        price: 15.99
      };

      const mockUpdatedProduct = {
        _id: 'prod123',
        name: 'Updated Name',
        price: 15.99,
        restaurantId: 'restaurant123'
      };

      Product.findOneAndUpdate.mockResolvedValue(mockUpdatedProduct);

      await editRestaurantProduct(req, res);

      expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: 'prod123', restaurantId: 'restaurant123' },
        { name: 'Updated Name', price: 15.99 },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should reject updates without product ID', async () => {
      req.body = { name: 'Updated Name' };
      await editRestaurantProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should reject invalid price updates', async () => {
      req.body = { _id: 'prod123', price: -5 };
      await editRestaurantProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 if product not found', async () => {
      req.body = { _id: 'prod123', name: 'Updated' };
      Product.findOneAndUpdate.mockResolvedValue(null);
      await editRestaurantProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('editRestaurantProductImage', () => {
    it('should update product image with valid data', async () => {
      req.body = {
        _id: 'prod123',
        imageBase64: 'base64encodedimage',
        tags: ['food', 'menu']
      };

      const mockProduct = {
        _id: 'prod123',
        image: 'oldimage.jpg',
        save: jest.fn().mockResolvedValue(true)
      };

      const mockUploadResponse = {
        secure_url: 'https://newimage.jpg'
      };

      Product.findOne.mockResolvedValue(mockProduct);
      uploadBase64Image.mockResolvedValue(mockUploadResponse);

      await editRestaurantProductImage(req, res);

      expect(uploadBase64Image).toHaveBeenCalledWith('base64encodedimage', ['food', 'menu']);
      expect(mockProduct.image).toBe('https://newimage.jpg');
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should reject missing required fields', async () => {
      req.body = { _id: 'prod123' };
      await editRestaurantProductImage(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 if product not found', async () => {
      req.body = {
        _id: 'prod123',
        imageBase64: 'base64',
        tags: ['food']
      };
      Product.findOne.mockResolvedValue(null);
      await editRestaurantProductImage(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle image upload failure', async () => {
      req.body = {
        _id: 'prod123',
        imageBase64: 'base64',
        tags: ['food']
      };
      Product.findOne.mockResolvedValue({ _id: 'prod123', save: jest.fn() });
      uploadBase64Image.mockResolvedValue(null);
      await editRestaurantProductImage(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product successfully', async () => {
      req.query.productId = 'prod123';
      const mockDeleted = { _id: 'prod123', name: 'Deleted Product' };
      Product.findOneAndDelete.mockResolvedValue(mockDeleted);

      await deleteProduct(req, res);

      expect(Product.findOneAndDelete).toHaveBeenCalledWith({
        _id: 'prod123',
        restaurantId: 'restaurant123'
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should reject missing product ID', async () => {
      await deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 404 if product not found', async () => {
      req.query.productId = 'prod123';
      Product.findOneAndDelete.mockResolvedValue(null);
      await deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle database errors', async () => {
      req.query.productId = 'prod123';
      Product.findOneAndDelete.mockRejectedValue(new Error('DB error'));
      await deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});