/**
 * @swagger
 * paths:
 *   /api/driver/sendRequest:
 *     post:
 *       tags:
 *         - Driver (JWT required)
 *       summary: Submit a generic request/complaint
 *       description: |
 *         Creates a new Request document for the authenticated sender  
 *         (User, Driver, or Restaurant) with an arbitrary JSON payload.  
 *         Admin approval may be required depending on request type.
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - description
 *               properties:
 *                 description:
 *                   type: string
 *                   description: A human-readable summary of the request
 *                   example: "I need to update my delivery address"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   description: Optional JSON metadata for the request
 *                   example:
 *                     orderId: "ORD123456"
 *                     newAddress: "123 New Street, Cityville"
 *       responses:
 *         '201':
 *           description: Request created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   request:
 *                     $ref: '#/components/schemas/Request'
 *         '403':
 *           $ref: '#/components/responses/ParameterRequiredError'
 *         '420':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '469':
 *           $ref: '#/components/responses/ForbiddenError'
 *         '500':
 *           $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * paths:
 *   /api/driver/getMyRequests:
 *     get:
 *       tags:
 *         - Driver (JWT required)
 *       summary: Retrieve all requests submitted by the authenticated user
 *       description: |
 *         Fetches every Request document where the senderId and senderModel  
 *         match the currently authenticated user (User, Driver, or Restaurant).
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: List of the user's requests
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   myRequests:
 *                     type: array
 *                     description: Array of Request objects submitted by the user
 *                     items:
 *                       $ref: '#/components/schemas/Request'
 *         '420':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '469':
 *           $ref: '#/components/responses/ForbiddenError'
 *         '500':
 *           $ref: '#/components/responses/ServerError'
 *
 *   /api/driver/getNotifications:
 *     get:
 *       tags:
 *         - Driver (JWT required)
 *       summary: Retrieve all notifications for the authenticated user
 *       description: |
 *         Fetches every Notification document where the receiverId and receiverModel  
 *         match the currently authenticated user (User, Driver, or Restaurant),  
 *         sorted by newest first.
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: List of notifications
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   count:
 *                     type: integer
 *                     description: Total number of notifications returned
 *                   notifications:
 *                     type: array
 *                     description: Array of Notification objects for the user
 *                     items:
 *                       $ref: '#/components/schemas/Notification'
 *         '420':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '469':
 *           $ref: '#/components/responses/ForbiddenError'
 *         '500':
 *           $ref: '#/components/responses/ServerError'
 */
