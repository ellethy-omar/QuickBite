const {
  getActiveChatsDriver,
  getMessagesDriver,
  getAllChatsDriver
} = require('../../controllers/driver/chatController');
const { getMessages, getActiveChats, markMessagesAsRead } = require('../../services/chatService');
const User = require('../../models/User');
const Message = require('../../models/Message');
const Chat = require('../../models/Chat');
const Order = require('../../models/Order');

jest.mock('../../services/chatService');
jest.mock('../../models/User');
jest.mock('../../models/Message');
jest.mock('../../models/Chat');
jest.mock('../../models/Order');

describe('Driver Chat Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      user: { _id: 'driver123' },
      query: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getActiveChatsDriver', () => {
    it('should return active chats with preview data', async () => {
      const mockChats = [{
        _id: 'chat1',
        participants: [
          { participantId: 'user123', participantType: 'user' },
          { participantId: 'driver123', participantType: 'driver' }
        ],
        orderId: 'order123'
      }];

      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        phone: '1234567890',
        profilePicture: 'profile.jpg'
      };

      const mockLastMessage = {
        content: 'Test message',
        createdAt: new Date(),
        senderId: 'user123'
      };

      const mockOrder = {
        _id: 'order123',
        status: 'delivered',
        totalAmount: 25.99
      };

      getActiveChats.mockResolvedValue(mockChats);
      Message.findOne.mockResolvedValue(mockLastMessage);
      User.findById.mockResolvedValue(mockUser);
      Message.countDocuments.mockResolvedValue(2);
      Order.findById.mockResolvedValue(mockOrder);

      await getActiveChatsDriver(req, res);

      expect(getActiveChats).toHaveBeenCalledWith('driver123', 'driver');
      expect(res.json).toHaveBeenCalledWith([{
        _id: 'chat1',
        user: {
          _id: 'user123',
          name: 'Test User',
          phone: '1234567890',
          profilePicture: 'profile.jpg'
        },
        order: {
          _id: 'order123',
          status: 'delivered',
          totalAmount: 25.99
        },
        lastMessage: {
          content: 'Test message',
          createdAt: mockLastMessage.createdAt,
          isFromDriver: false
        },
        unreadCount: 2
      }]);
    });

    it('should handle errors', async () => {
      getActiveChats.mockRejectedValue(new Error('Database error'));
      await getActiveChatsDriver(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getMessagesDriver', () => {
    it('should return messages for valid chat', async () => {
      req.query.chatId = 'chat123';
      const mockMessages = [
        { _id: 'msg1', content: 'Test 1' },
        { _id: 'msg2', content: 'Test 2' }
      ];

      getMessages.mockResolvedValue(mockMessages);
      markMessagesAsRead.mockResolvedValue(true);

      await getMessagesDriver(req, res);

      expect(getMessages).toHaveBeenCalledWith(
        expect.any(mongoose.Types.ObjectId),
        20,
        null
      );
      expect(markMessagesAsRead).toHaveBeenCalledWith(
        expect.any(mongoose.Types.ObjectId),
        'driver123'
      );
      expect(res.json).toHaveBeenCalledWith({
        messages: mockMessages,
        hasMore: false
      });
    });

    it('should return 403 if chatId is missing', async () => {
      await getMessagesDriver(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should handle pagination parameters', async () => {
      req.query.chatId = 'chat123';
      req.query.before = '2023-01-01T00:00:00Z';
      req.query.limit = '10';

      getMessages.mockResolvedValue(new Array(10).fill({}));

      await getMessagesDriver(req, res);

      expect(getMessages).toHaveBeenCalledWith(
        expect.any(mongoose.Types.ObjectId),
        10,
        new Date('2023-01-01T00:00:00Z')
      );
      expect(res.json).toHaveBeenCalledWith({
        messages: expect.any(Array),
        hasMore: true
      });
    });
  });

  describe('getAllChatsDriver', () => {
    it('should return all chats sorted by last activity', async () => {
      const mockChats = [{
        _id: 'chat1',
        participants: [
          { participantId: 'user123', participantType: 'user' },
          { participantId: 'driver123', participantType: 'driver' }
        ],
        orderId: 'order123',
        lastActivity: new Date()
      }];

      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        phone: '1234567890',
        profilePicture: 'profile.jpg'
      };

      const mockLastMessage = {
        content: 'Test message',
        createdAt: new Date(),
        senderId: 'user123'
      };

      const mockOrder = {
        _id: 'order123',
        status: 'delivered',
        totalAmount: 25.99
      };

      Chat.find.mockResolvedValue(mockChats);
      Message.findOne.mockResolvedValue(mockLastMessage);
      User.findById.mockResolvedValue(mockUser);
      Message.countDocuments.mockResolvedValue(2);
      Order.findById.mockResolvedValue(mockOrder);

      await getAllChatsDriver(req, res);

      expect(Chat.find).toHaveBeenCalledWith({
        participants: {
          $elemMatch: { 
            participantId: 'driver123', 
            participantType: 'driver' 
          }
        }
      });
      expect(res.json).toHaveBeenCalledWith([{
        _id: 'chat1',
        user: {
          _id: 'user123',
          name: 'Test User',
          phone: '1234567890',
          profilePicture: 'profile.jpg'
        },
        order: {
          _id: 'order123',
          status: 'delivered',
          totalAmount: 25.99
        },
        lastMessage: {
          content: 'Test message',
          createdAt: mockLastMessage.createdAt,
          isFromDriver: false
        },
        unreadCount: 2
      }]);
    });

    it('should handle errors', async () => {
      Chat.find.mockRejectedValue(new Error('Database error'));
      await getAllChatsDriver(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});