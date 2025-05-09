
/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: Unique identifier of the admin.
 *           example: "605c3c2f1c9d440000a1b2c3"
 *         name:
 *           type: string
 *           description: Admin’s full name.
 *           example: "Alice Smith"
 *         email:
 *           type: string
 *           format: email
 *           description: Admin’s unique email address.
 *           example: "admin@example.com"
 *         phone:
 *           type: string
 *           description: Admin’s contact phone number.
 *           example: "+15551234567"
 *         password:
 *           type: string
 *           writeOnly: true
 *           description: Password for admin account (hashed in the database).
 *           example: "P@ssw0rd!"
 *         handledRequests:
 *           type: integer
 *           description: Number of requests this admin has handled.
 *           example: 42
 *         profilePicture:
 *           type: string
 *           format: uri
 *           description: URL to the admin’s profile picture.
 *           example: "https://cdn.example.com/avatars/admin123.png"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the admin account was created.
 *           example: "2025-04-30T14:20:00Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 609e12672f8fb814b56fa181
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         phone:
 *           type: number
 *           example: 201012345678
 *         Vehicle:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               example: Motorcycle
 *             plateNumber:
 *               type: string
 *               example: ABC1234
 *             color:
 *               type: string
 *               example: Red
 *         rating:
 *           type: number
 *           example: 4.8
 *         deliveryStats:
 *           type: object
 *           properties:
 *             completed:
 *               type: number
 *               example: 120
 *             avgDeliveryTime:
 *               type: number
 *               description: Average delivery time in minutes
 *               example: 30.5
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-04-18T08:45:30.000Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DailyHours:
 *       type: object
 *       required:
 *         - open
 *         - close
 *       properties:
 *         open:
 *           type: string
 *           pattern: "^([0-1][0-9]|2[0-3]):[0-5][0-9]$"
 *           example: "10:00"
 *         close:
 *           type: string
 *           pattern: "^([0-1][0-9]|2[0-3]):[0-5][0-9]$"
 *           example: "22:00"

 *     Contact:
 *       type: object
 *       required:
 *         - phone
 *         - email
 *         - password
 *       properties:
 *         phone:
 *           type: string
 *           example: "01012345678"
 *         email:
 *           type: string
 *           format: email
 *           example: "contact@restaurant.com"
 *         password:
 *           type: string
 *           example: "P@ssw0rdStrong!"

 *     RestaurantAddress:
 *       type: object
 *       required:
 *         - street
 *         - city
 *         - area
 *       properties:
 *         street:
 *           type: string
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           example: "Cairo"
 *         area:
 *           type: string
 *           example: "Downtown"

 *     OpeningHours:
 *       type: object
 *       properties:
 *         sunday:
 *           $ref: '#/components/schemas/DailyHours'
 *         monday:
 *           $ref: '#/components/schemas/DailyHours'
 *         tuesday:
 *           $ref: '#/components/schemas/DailyHours'
 *         wednesday:
 *           $ref: '#/components/schemas/DailyHours'
 *         thursday:
 *           $ref: '#/components/schemas/DailyHours'
 *         friday:
 *           $ref: '#/components/schemas/DailyHours'
 *         saturday:
 *           $ref: '#/components/schemas/DailyHours'


 *     Restaurant:
*       type: object
*       required:
*         - name
*         - description
*         - cuisineType
*         - address
*         - contact
*         - openingHours
*       properties:
*         name:
*           type: string
*           example: "The Best Restaurant"
*         description:
*           type: string
*           example: "A place that serves delicious food."
*         cuisineType:
*           type: array
*           items:
*             type: string
*           example: ["Italian", "Pizza"]
*         address:
*           $ref: '#/components/schemas/RestaurantAddress'
*         contact:
*           $ref: '#/components/schemas/Contact'
*         openingHours:
*           $ref: '#/components/schemas/OpeningHours'
*         isActive:
*           type: boolean
*           example: true
*         logo:
*           type: string
*           example: "logo.jpg"
*         coverImage:
*           type: string
*           example: "cover.jpg"
*         createdAt:
*           type: string

*/


/**
 * @swagger
 * components:
 *   schemas:
 *     UserAddress:
 *       type: object
 *       properties:
 *         label:
 *           type: string
 *           example: "Home"
 *         area:
 *           type: string
 *           example: "Downtown"
 *         street:
 *           type: string
 *           example: "Main St."
 *         building:
 *           type: string
 *           example: "Building A"
 *         floor:
 *           type: string
 *           example: "3rd Floor"
 *         apartment:
 *           type: string
 *           example: "Apt 301"
 *         isDefault:
 *           type: boolean
 *           example: true

 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Jane Smith"
 *         email:
 *           type: string
 *           required: true
 *           example: "janesmith@example.com"
 *         phone:
 *           type: string
 *           example: "2021234567"
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserAddress'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-18T08:45:30.000Z"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Cheese Pizza"
 *         description:
 *           type: string
 *           example: "A delicious pizza with mozzarella cheese and tomato sauce."
 *         price:
 *           type: number
 *           example: 12.99
 *         stockAvailable:
 *           type: number
 *           example: 12.99
 *         restraurantId:
 *           type: string
 *           format: objectId
 *           description: "ID of the restaurant to which the product belongs"
 *           example: "60c72b2f5f1b2c001f58c1b4"
 *         category:
 *           type: string
 *           example: "Pizza"
 *         isAvailable:
 *           type: boolean
 *           example: true
 *         image:
 *           type: string
 *           default: "default-cover.jpg"
 *           example: "<some url>"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           format: objectId
 *           description: "ID of the product being ordered"
 *           example: "60c72b2f5f1b2c001f58c1b4"
 *         quantity:
 *           type: number
 *           example: 2
 *
 *     Order:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: ['pending', 'processing', 'delivered', 'cancelled']
 *           default: 'pending'
 *           example: 'pending'
 *         userID:
 *           type: string
 *           format: objectId
 *           description: "ID of the user who placed the order"
 *           example: "60c72b2f5f1b2c001f58c1b4"
 *         restaurantID:
 *           type: string
 *           format: objectId
 *           description: "ID of the restaurant from which the order is placed"
 *           example: "60c72b2f5f1b2c001f58c1b4"
 *         deliveryDriverID:
 *           type: string
 *           format: objectId
 *           description: "ID of the driver delivering the order"
 *           example: "60c72b2f5f1b2c001f58c1b4"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         totalAmount:
 *           type: number
 *           example: 35.99
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-18T08:45:30.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-18T09:45:30.000Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       required:
 *         - participants
 *         - orderId
 *       properties:
 *         participants:
 *           type: array
 *           description: List of participants in this conversation
 *           minItems: 2
 *           items:
 *             type: object
 *             required:
 *               - participantId
 *               - participantType
 *             properties:
 *               participantId:
 *                 type: string
 *                 format: objectId
 *                 description: ID of the participant (user or driver)
 *                 example: "60c72b2f5f1b2c001f58c1b4"
 *               participantType:
 *                 type: string
 *                 enum: [user, driver]
 *                 description: Role of the participant
 *                 example: "user"
 *         orderId:
 *           type: string
 *           format: objectId
 *           description: Reference to the Order that initiated this chat
 *           example: "60d82c3e6f2b4a2d4c8e1234"
 *         isActive:
 *           type: boolean
 *           description: Whether the conversation is currently active
 *           default: true
 *         lastActivity:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the last message or update
 *           example: "2025-04-18T09:45:30.000Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When this conversation was created
 *           example: "2025-04-18T08:45:30.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When this conversation was last modified
 *           example: "2025-04-18T09:45:30.000Z"
 *
 *     Message:
 *       type: object
 *       required:
 *         - chatId
 *         - senderId
 *         - senderType
 *         - content
 *       properties:
 *         chatId:
 *           type: string
 *           format: objectId
 *           description: ID of the Conversation this message belongs to
 *           example: "60c72b2f5f1b2c001f58c1b4"
 *         senderId:
 *           type: string
 *           format: objectId
 *           description: ID of the user or driver who sent the message
 *           example: "60d82c3e6f2b4a2d4c8e1234"
 *         senderType:
 *           type: string
 *           enum: [user, driver]
 *           description: Role of the sender
 *           example: "driver"
 *         content:
 *           type: string
 *           description: The body of the message
 *           example: "Your order is on its way!"
 *         isRead:
 *           type: boolean
 *           description: Whether the recipient has read the message
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When this message was created
 *           example: "2025-04-18T08:50:15.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When this message was last updated
 *           example: "2025-04-18T08:50:15.000Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadImagePayload:
 *       type: object
 *       required:
 *         - imageBase64
 *         - tags
 *       properties:
 *         imageBase64:
 *           type: string
 *           description: Base64-encoded image data
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags to apply to the image
 *
 *     ImageUploadResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Profile image updated successfully
 *         imageURL:
 *           type: string
 *           format: uri
 *           example: https://res.cloudinary.com/.../profile.jpg
 *
 *   requestBodies:
 *     UploadImage:
 *       description: Any endpoint that takes imageBase64 + tags
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UploadImagePayload'
 *     
 */