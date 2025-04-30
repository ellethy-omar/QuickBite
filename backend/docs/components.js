
//  *         $ref: '#/components/responses/InvalidCredentialsError'
/*
    ? COMMON RESPONSES
    ? 420                $ref: '#/components/responses/UnauthorizedError'
    ? 469                $ref: '#/components/responses/ForbiddenError'
    ? 403                $ref: '#/components/responses/ParameterRequiredError'
    ? 410                $ref: '#/components/responses/UserAlreadyExistsError'
    ? 404                $ref: '#/components/responses/InvalidCredentialsError'
    ? 500                $ref: '#/components/responses/ServerError'

    ! COMMON SCHEMAS
    !                    $ref: '#/components/schemas/User'
    !                    $ref: '#/components/schemas/Driver'
    !                    $ref: '#/components/schemas/Restaurant'
    !                    $ref: '#/components/schemas/Admin'
    !                    $ref: '#/components/schemas/Product'
    !                    $ref: '#/components/schemas/Order'
    !                    $ref: '#/components/schemas/Message'
    !                    $ref: '#/components/schemas/Chat'
    !                    $ref: '#/components/schemas/restaurantAddress'
    !                    $ref: '#/components/schemas/UserAddress'
*/

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Authorization token required or invalid
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Authorization token required
 *     ForbiddenError:
 *       description: Forbidden. Role not authorized.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Access denied, you don't have the authority to do this!
 *     ParameterRequiredError:
 *       description: A required parameter is missing in the request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Any thing can be required, I have tried
 *     UserAlreadyExistsError:
 *       description: The user already exists in the system
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: User already exists
 *     InvalidCredentialsError:
 *       description: Invalid login credentials provided
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Invalid credentials
 */

/**
 * @swagger
 * components:
 *   responses:
 *     ServerError:
 *       description: Server error. Call Omar
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "If you see status 500 tell me, thsi is not an example"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the admin.
 *         name:
 *           type: string
 *           description: The admin's name.
 *         email:
 *           type: string
 *           description: The admin's email address.
 *         phone:
 *           type: string
 *           description: The admin's phone number.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the admin was created.
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
 *     Message:
 *       type: object
 *       properties:
 *         chatId:
 *           type: string
 *           format: objectId
 *           description: "ID of the Chat the message belongs to"
 *           example: "60c72b2f5f1b2c001f58c1b4"
 *         senderId:
 *           type: string
 *           format: objectId
 *           description: "ID of the user who sent the message"
 *           example: "60c72b2f5f1b2c001f58c1b4"
 *         content:
 *           type: string
 *           description: "The message content"
 *           example: "Hello, how are you?"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           default: "2025-04-18T08:45:30.000Z"
 *           example: "2025-04-18T08:45:30.000Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         participants:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *             description: "IDs of the users participating in the Chat"
 *             example: "60c72b2f5f1b2c001f58c1b4"
 *           minItems: 2
 *           uniqueItems: true
 *           description: "At least two unique participants are required for a Chat."
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
 *   responses:
 *     ImageUploadSuccess:
 *       description: Returned when the image is saved successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageUploadResponse'
 */