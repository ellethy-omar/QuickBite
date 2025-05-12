const {
    getRestaurantProfie,
    updateRestaurantProfile,
    updateRestaurantLogo,
    updateRestaurantCoverImage
} = require('../../controllers/restaurant/profileContorller'); // Adjust the path as needed
const Restaurant = require('../../models/Restaurant');
const { uploadBase64Image } = require('../../controllers/cloudinaryController');

// Mock dependencies
jest.mock('../../models/Restaurant');
jest.mock('../../controllers/cloudinaryController');

describe('Restaurant Profile Controllers', () => {
    // Common mock objects and setup
    const mockUser = { _id: 'restaurant123' };
    const mockReq = { user: mockUser };
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test getRestaurantProfie
    describe('getRestaurantProfie', () => {
        it('should fetch restaurant profile successfully', async () => {
            const mockRestaurant = { 
                _id: 'restaurant123', 
                name: 'Test Restaurant' 
            };
            
            Restaurant.findById.mockResolvedValue(mockRestaurant);

            await getRestaurantProfie(mockReq, mockRes);

            expect(Restaurant.findById).toHaveBeenCalledWith(mockUser._id);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ restaurant: mockRestaurant });
        });
    });

    // Test updateRestaurantProfile
    describe('updateRestaurantProfile', () => {
        it('should update restaurant profile successfully', async () => {
            const mockRestaurant = { 
                _id: 'restaurant123', 
                name: 'Old Name',
                save: jest.fn()
            };
            
            const mockReqBody = {
                name: 'New Restaurant Name',
                description: 'Updated description',
                cuisineType: 'Italian'
            };

            mockReq.body = mockReqBody;

            Restaurant.findById.mockResolvedValue(mockRestaurant);

            await updateRestaurantProfile(mockReq, mockRes);

            expect(Restaurant.findById).toHaveBeenCalledWith(mockUser._id);
            expect(mockRestaurant.name).toBe(mockReqBody.name);
            expect(mockRestaurant.description).toBe(mockReqBody.description);
            expect(mockRestaurant.cuisineType).toBe(mockReqBody.cuisineType);
            expect(mockRestaurant.save).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Restaurant profile updated successfully',
                    restaurant: expect.any(Object)
                })
            );
        });

        it('should return 404 if restaurant not found', async () => {
            Restaurant.findById.mockResolvedValue(null);

            await updateRestaurantProfile(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Restaurant not found' });
        });
    });

    // Test updateRestaurantLogo
    describe('updateRestaurantLogo', () => {
        it('should update restaurant logo successfully', async () => {
            const mockRestaurant = { 
                _id: 'restaurant123', 
                save: jest.fn()
            };
            
            const mockReqBody = {
                imageBase64: 'base64encodedimage',
                tags: ['restaurant', 'logo']
            };

            mockReq.body = mockReqBody;

            const mockUploadResponse = {
                secure_url: 'https://example.com/logo.jpg'
            };

            Restaurant.findById.mockResolvedValue(mockRestaurant);
            uploadBase64Image.mockResolvedValue(mockUploadResponse);

            await updateRestaurantLogo(mockReq, mockRes);

            expect(Restaurant.findById).toHaveBeenCalledWith(mockUser._id);
            expect(uploadBase64Image).toHaveBeenCalledWith(mockReqBody.imageBase64, mockReqBody.tags);
            expect(mockRestaurant.logo).toBe(mockUploadResponse.secure_url);
            expect(mockRestaurant.save).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Logo updated successfully',
                imageURL: mockUploadResponse.secure_url
            });
        });

        it('should return 403 if required fields are missing', async () => {
            mockReq.body = {};

            await updateRestaurantLogo(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(403);
            expect(mockRes.json).toHaveBeenCalledWith({ 
                error: 'Product ID, imageBase64, and tags are required.' 
            });
        });

        it('should return 500 if image upload fails', async () => {
            const mockRestaurant = { 
                _id: 'restaurant123', 
                save: jest.fn()
            };
            
            const mockReqBody = {
                imageBase64: 'base64encodedimage',
                tags: ['restaurant', 'logo']
            };

            mockReq.body = mockReqBody;

            Restaurant.findById.mockResolvedValue(mockRestaurant);
            uploadBase64Image.mockResolvedValue(null);

            await updateRestaurantLogo(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ 
                error: 'Image upload failed.' 
            });
        });
    });

    // Test updateRestaurantCoverImage (similar to updateRestaurantLogo)
    describe('updateRestaurantCoverImage', () => {
        it('should update restaurant cover image successfully', async () => {
            const mockRestaurant = { 
                _id: 'restaurant123', 
                save: jest.fn()
            };
            
            const mockReqBody = {
                imageBase64: 'base64encodedimage',
                tags: ['restaurant', 'cover']
            };

            mockReq.body = mockReqBody;

            const mockUploadResponse = {
                secure_url: 'https://example.com/cover.jpg'
            };

            Restaurant.findById.mockResolvedValue(mockRestaurant);
            uploadBase64Image.mockResolvedValue(mockUploadResponse);

            await updateRestaurantCoverImage(mockReq, mockRes);

            expect(Restaurant.findById).toHaveBeenCalledWith(mockUser._id);
            expect(uploadBase64Image).toHaveBeenCalledWith(mockReqBody.imageBase64, mockReqBody.tags);
            expect(mockRestaurant.coverImage).toBe(mockUploadResponse.secure_url);
            expect(mockRestaurant.save).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Cover image updated successfully',
                imageURL: mockUploadResponse.secure_url
            });
        });

        it('should return 403 if required fields are missing', async () => {
            mockReq.body = {};

            await updateRestaurantCoverImage(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(403);
            expect(mockRes.json).toHaveBeenCalledWith({ 
                error: 'Product ID, imageBase64, and tags are required.' 
            });
        });

        it('should return 500 if image upload fails', async () => {
            const mockRestaurant = { 
                _id: 'restaurant123', 
                save: jest.fn()
            };
            
            const mockReqBody = {
                imageBase64: 'base64encodedimage',
                tags: ['restaurant', 'cover']
            };

            mockReq.body = mockReqBody;

            Restaurant.findById.mockResolvedValue(mockRestaurant);
            uploadBase64Image.mockResolvedValue(null);

            await updateRestaurantCoverImage(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ 
                error: 'Image upload failed.' 
            });
        });
    });
});