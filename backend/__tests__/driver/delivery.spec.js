const {
    getAllAvailableOrders,
    acceptOrder,
    leaveOrder,
    getTheOrderIneedToDeliver,
    getMyOrdersHistory,
    markDeliveryAsDone
} = require('../../controllers/driver/deliveryController'); // Adjust path as needed
const Order = require('../../models/Order');
const Chat = require('../../models/Chat');
const Driver = require('../../models/Driver');
const { sendWSMessage } = require('../../websockets/utils/wsUtils');
const { getOrCreateChat } = require('../../services/chatService');

// Mock dependencies
jest.mock('../../models/Order');
jest.mock('../../models/Chat');
jest.mock('../../models/Driver');
jest.mock('../../websockets/utils/wsUtils');
jest.mock('../../services/chatService');

describe('Driver Order Controllers', () => {
    // Common mock objects and setup
    const mockDriver = { _id: 'driver123' };
    const mockReq = { 
        user: mockDriver,
        query: {} 
    };
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test getAllAvailableOrders
    describe('getAllAvailableOrders', () => {
        it('should fetch available orders successfully', async () => {
            const mockAvailableOrders = [
                { _id: 'order1', status: 'pending' },
                { _id: 'order2', status: 'pending' }
            ];

            Order.findOrdersNeedingDelivery = jest.fn().mockResolvedValue(mockAvailableOrders);

            await getAllAvailableOrders(mockReq, mockRes);

            expect(Order.findOrdersNeedingDelivery).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: mockAvailableOrders
            });
        });

        it('should return empty array if no available orders', async () => {
            Order.findOrdersNeedingDelivery = jest.fn().mockResolvedValue([]);

            await getAllAvailableOrders(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ 
                message: 'No available orders found.', 
                data: [] 
            });
        });
    });

    // Test acceptOrder
    describe('acceptOrder', () => {
        

        it('should prevent accepting multiple orders', async () => {
            const mockOrderId = 'order123';
            mockReq.query.orderId = mockOrderId;

            // Mock existing order check
            const mockExistingOrder = { _id: 'existingOrder' };
            Order.findOne.mockResolvedValueOnce(mockExistingOrder);

            await acceptOrder(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: expect.stringContaining('You already have an order'),
                    existingOrder: mockExistingOrder
                })
            );
        });
    });

    // Test leaveOrder
    describe('leaveOrder', () => {
        it('should leave order successfully', async () => {
            const mockOrderId = 'order123';
            mockReq.query.orderId = mockOrderId;

            const mockOrder = {
                _id: mockOrderId,
                userID: 'user123',
                deliveryDriverID: mockDriver._id,
                status: 'processing',
                save: jest.fn()
            };

            Order.findById.mockResolvedValue(mockOrder);
            Chat.findOneAndUpdate.mockResolvedValue({});
            sendWSMessage.mockReturnValue(true);

            await leaveOrder(mockReq, mockRes);

            expect(Order.findById).toHaveBeenCalledWith(mockOrderId);
            expect(mockOrder.deliveryDriverID).toBeNull();
            expect(mockOrder.status).toBe('pending');
            expect(mockOrder.save).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'You have left the order successfully.'
            });
            expect(sendWSMessage).toHaveBeenCalledWith(
                'user',
                mockOrder.userID,
                'orderLeft',
                expect.any(Object)
            );
        });

        it('should prevent leaving an order not assigned to driver', async () => {
            const mockOrderId = 'order123';
            mockReq.query.orderId = mockOrderId;

            const mockOrder = {
                _id: mockOrderId,
                deliveryDriverID: 'another-driver'
            };

            Order.findById.mockResolvedValue(mockOrder);

            await leaveOrder(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(403);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: 'You do not have this order.'
            });
        });
    });

    

    

    // Test markDeliveryAsDone
    describe('markDeliveryAsDone', () => {
        

        it('should prevent marking delivery as done without an active order', async () => {
            Order.findOne.mockResolvedValue(null);

            await markDeliveryAsDone(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'You do not have any orders.',
                existingOrder: null
            });
        });
    });
});