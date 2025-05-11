/**
 * @swagger
 * tags:
 *   - name: Admin (JWT required)
 *     description: Admin endpoints for managing requests
 *
 * /api/admin/getAllRequests:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Fetch all requests
 *     description: Returns a list of all requests, optionally filtered by status or sender type.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, declined]
 *         description: Filter by request status
 *       - in: query
 *         name: senderModel
 *         schema:
 *           type: string
 *           enum: [User, Restaurant, Driver]
 *         description: Filter by the type of sender
 *     responses:
 *       200:
 *         description: List of requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of requests returned
 *                 requests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Request'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/getRequestById:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Fetch a single request by ID
 *     description: Returns the request document for the given `requestId`, including populated sender data.
 *     parameters:
 *       - in: query
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ObjectId of the request to retrieve
 *     responses:
 *       200:
 *         description: A single request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 request:
 *                   $ref: '#/components/schemas/Request'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */


/**
 * @swagger
 * paths:
 *   /api/admin/processDriverProfileUpdateRequest:
 *     put:
 *       tags:
 *         - Admin (JWT required)
 *       summary: Process a driver's profile update request
 *       description: |
 *         Accepts or declines a pending driver profile update request.  
 *         If accepted, applies the requested updates after checking for email/phone uniqueness.  
 *         Always records the action in the Request, increments the Admin's handledRequests,  
 *         and sends a Notification to the driver.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - requestId
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [accepted, declined]
 *                   description: Whether to approve or decline the request
 *                   example: accepted
 *                 requestId:
 *                   type: string
 *                   format: objectId
 *                   description: ID of the Request to process
 *                   example: "60d876ab6f2b4a2d4c8e1234"
 *                 adminMessage:
 *                   type: string
 *                   description: Optional message from the admin to include in the notification
 *                   example: "Please update your profile picture resolution"
 *       responses:
 *         200:
 *           description: Request processed successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Request approved successfully"
 *                 request:
 *                   _id: "6820f894e0aa0a3a96f451e7"
 *                   senderId: "68134265dcd931f93ef915b9"
 *                   senderModel: "Driver"
 *                   description: "Driver profile update request"
 *                   data:
 *                     updates:
 *                       name: "Anas alaa"
 *                       email: "Annasalaa597@gmail.com"
 *                       phone: "1456575156"
 *                       vehicle:
 *                         type: "Bike"
 *                         plateNumber: "XYZ1234"
 *                         model: "Racism"
 *                     originalRequest: "updateDriverProfile"
 *                   status: "accepted"
 *                   createdAt: "2025-05-11T19:20:52.967Z"
 *                   updatedAt: "2025-05-11T19:22:48.144Z"
 *                   __v: 0
 *                 notification:
 *                   senderId: "6813507db8f1da4a57fd0be8"
 *                   receiverId: "68134265dcd931f93ef915b9"
 *                   receiverModel: "Driver"
 *                   description: "Your profile update request has been approved"
 *                   data:
 *                     requestId: "6820f894e0aa0a3a96f451e7"
 *                     status: "accepted"
 *                     message: "potatoes"
 *                     updates:
 *                       name: "Anas alaa"
 *                       email: "Annasalaa597@gmail.com"
 *                       phone: "1456575156"
 *                       vehicle:
 *                         type: "Bike"
 *                         plateNumber: "XYZ1234"
 *                         model: "Racism"
 *                     error: null
 *                   _id: "6820f908e0aa0a3a96f45200"
 *                   createdAt: "2025-05-11T19:22:48.569Z"
 *                   __v: 0
 *                 driver:
 *                   vehicle:
 *                     plateNumber: "XYZ1234"
 *                     model: "Racism"
 *                   deliveryStats:
 *                     avgDeliveryTime: 388.99683333333337
 *                     completed: 4
 *                   _id: "68134265dcd931f93ef915b9"
 *                   name: "Anas alaa"
 *                   email: "Annasalaa597@gmail.com"
 *                   phone: "1456575156"
 *                   password: "$2b$10$8qQR7qjIxWjQvkw0ueFEM.j6KyECj7xKMIAGXzsIUxIkCDy7NKfaK"
 *                   isBanned: false
 *                   createdAt: "2025-05-01T09:44:05.221Z"
 *                   __v: 0
 *                   profilePicture: "https://res.cloudinary.com/dr1sqiouu/image/upload/v1746204311/viwddo3ueofdjyplsx16.jpg"
 *                   rating: 0.1
 *                   ratingCount: 51
 *         409:
 *           description: Request declined due to conflicts (e.g. duplicate email/phone)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Request declined due to conflicts
 *                   error:
 *                     type: string
 *                     description: Detailed conflict message
 *                     example: Phone number +123456789 is already in use by another driver
 *                   request:
 *                     $ref: '#/components/schemas/Request'
 *                   notification:
 *                     $ref: '#/components/schemas/Notification'
 *         403:
 *           $ref: '#/components/responses/ParameterRequiredError'
 *         420:
 *           $ref: '#/components/responses/UnauthorizedError'
 *         469:
 *           $ref: '#/components/responses/ForbiddenError'
 *         404:
*            $ref: '#/components/responses/InvalidCredentialsError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * paths:
 *   /api/admin/processDriverProfilePhotoUpdateRequest:
 *     put:
 *       tags:
 *         - Admin (JWT required)
 *       summary: Process a driver's profile photo update request
 *       description: |
 *         Accepts or declines a pending driver profile photo update request.  
 *         If accepted, updates the driver's Cloudinary image,  
 *         records the action in the Request, increments the Admin's handledRequests,  
 *         and sends a Notification to the driver.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - requestId
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [accepted, declined]
 *                   description: Approve or decline the photo update
 *                   example: accepted
 *                 requestId:
 *                   type: string
 *                   format: objectId
 *                   description: ID of the Request to process
 *                   example: "6820fa42f342c482d43eccdc"
 *                 adminMessage:
 *                   type: string
 *                   description: Optional message from the admin for the notification
 *                   example: "Looks great!"
 *       responses:
 *         '200':
 *           description: Photo update request processed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Request approved successfully"
 *                   request:
 *                     $ref: '#/components/schemas/Request'
 *                   notification:
 *                     $ref: '#/components/schemas/Notification'
 *                   imageURL:
 *                     type: string
 *                     format: uri
 *                     description: Final URL of the updated driver profile photo
 *                     example: "https://res.cloudinary.com/dr1sqiouu/image/upload/v1746991682/m9d57tltimj7gh2tzqjl.jpg"
 *         '403':
 *           $ref: '#/components/responses/ParameterRequiredError'
 *         '420':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '469':
 *           $ref: '#/components/responses/ForbiddenError'
 *         '404':
 *           $ref: '#/components/responses/InvalidCredentialsError'
 *         '500':
 *           $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * paths:
 *   /api/admin/processRequest:
 *     put:
 *       tags:
 *         - Admin (JWT required)
 *       summary: Process a generic request
 *       description: |
 *         Accepts or declines a pending request.  
 *         Updates the Request status, increments the Admin's handledRequests,  
 *         and sends a Notification to the original sender.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - requestId
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [accepted, declined]
 *                   description: Approve or decline the request
 *                   example: accepted
 *                 requestId:
 *                   type: string
 *                   format: objectId
 *                   description: ID of the Request to process
 *                   example: "6820fa42f342c482d43eccdc"
 *                 adminMessage:
 *                   type: string
 *                   description: Optional message from the admin for the notification
 *                   example: "Thank you for your feedback"
 *       responses:
 *         '200':
 *           description: Request processed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Request approved successfully"
 *                   request:
 *                     $ref: '#/components/schemas/Request'
 *                   notification:
 *                     $ref: '#/components/schemas/Notification'
 *         '403':
 *           $ref: '#/components/responses/ParameterRequiredError'
 *         '420':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '469':
 *           $ref: '#/components/responses/ForbiddenError'
 *         '404':
 *           $ref: '#/components/responses/InvalidCredentialsError'
 *         '500':
 *           $ref: '#/components/responses/ServerError'
 */


/**
 * @swagger
 * paths:
 *   /api/admin/sendNotification:
 *     post:
 *       tags:
 *         - Admin (JWT required)
 *       summary: Send a custom notification to a user, driver, or restaurant
 *       description: |
 *         Sends a custom notification from an admin to a receiver of type `User`, `Driver`, or `Restaurant`.  
 *         The admin can optionally include a `data` object with additional context.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - receiverId
 *                 - receiverModel
 *                 - description
 *               properties:
 *                 receiverId:
 *                   type: string
 *                   format: objectId
 *                   description: The MongoDB ObjectId of the notification receiver
 *                   example: "68134265dcd931f93ef915b9"
 *                 receiverModel:
 *                   type: string
 *                   enum: [User, Driver, Restaurant]
 *                   description: The receiver's role
 *                   example: Driver
 *                 description:
 *                   type: string
 *                   description: A short message describing the notification
 *                   example: "Your vehicle insurance document is due for renewal"
 *                 data:
 *                   type: object
 *                   description: Optional metadata or extra data for the notification
 *                   example: {
 *                     "dueDate": "2025-06-01",
 *                     "documentType": "Insurance",
 *                     "actionRequired": true
 *                   }
 *       responses:
 *         '201':
 *           description: Notification sent successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Notification sent successfully
 *                   notification:
 *                     $ref: '#/components/schemas/Notification'
 *         '403':
 *           $ref: '#/components/responses/ParameterRequiredError'
 *         '420':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '469':
 *           $ref: '#/components/responses/ForbiddenError'
 *         '404':
 *           $ref: '#/components/responses/InvalidCredentialsError'
 *         '500':
 *           $ref: '#/components/responses/ServerError'
 */
