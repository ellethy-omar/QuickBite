/**
 * @swagger
 * tags:
 *   - name: Driver (JWT required)
 *     description: Endpoints related to driver operations and orders. Only drivers can use these apis
 */

/**
 * @swagger
 * /api/driver/getDriverProfile:
 *   get:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Get the driver profile.
 *     description: Returns the profile of the authenticated driver.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved driver profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 driver:
 *                   $ref: '#/components/schemas/Driver'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 * /api/driver/updateDriverProfile:
 *   put:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Update the driver's profile information.
 *     description: Updates the profile details (name, email, phone, and vehicle) of the authenticated driver.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The driver's name.
 *               email:
 *                 type: string
 *                 description: The driver's email address.
 *               phone:
 *                 type: string
 *                 description: The driver's phone number.
 *               vehicle:
 *                 type: object
 *                 properties:
 *                   plateNumber:
 *                     type: string
 *                     description: The driver's vehicle plate number.
 *                   model:
 *                     type: string
 *                     description: The model of the driver's vehicle.
 *                   category:
 *                     type: string
 *                     description: The category of the driver's vehicle (e.g., sedan, van).
 *     responses:
 *       200:
 *         description: Driver profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Driver profile updated successfully"
 *                 driver:
 *                   $ref: '#/components/schemas/Driver'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 * /api/driver/updateDriverProfilePhoto:
 *   put:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Update the driver's profile photo.
 *     description: Updates the profile photo of the authenticated driver.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UploadImagePayload'
 *     responses:
 *       200:
 *         description: Driver profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 */
/**
 * @swagger
 * /api/driver/getAllAvailableOrders:
 *   get:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Get all delivery orders.
 *     description: Retrieves all orders available for delivery, including detailed user, restaurant, address, and item data.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all orders available.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "680a54bb7a7698bbca9f46fe"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       userID:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           phone:
 *                             type: string
 *                           addresses:
 *                             type: array
 *                             items:
 *                               $ref: '#/components/schemas/UserAddress'
 *                       userAddress:
 *                         $ref: '#/components/schemas/UserAddress'
 *                       restaurantID:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           address:
 *                             type: object
 *                             properties:
 *                               street:
 *                                 type: string
 *                               city:
 *                                 type: string
 *                               area:
 *                                 type: string
 *                               _id:
 *                                 type: string
 *                       restaurantAddress:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                           city:
 *                             type: string
 *                           area:
 *                             type: string
 *                           _id:
 *                             type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             productId:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 price:
 *                                   type: number
 *                             quantity:
 *                               type: integer
 *                             _id:
 *                               type: string
 *                       totalAmount:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       __v:
 *                         type: integer
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'

* /api/driver/acceptOrder:
*   put:
*     tags:
*       - Driver (JWT required)
*     summary: Accept a delivery order.
*     description: Allows a driver to accept an order for delivery.
*     parameters:
*       - name: orderId
*         in: query
*         description: The ID of the order to accept.
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Order accepted successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Order accepted successfully"
*                 order:
*                   $ref: '#/components/schemas/Order'
*       403:
*         $ref: '#/components/responses/ParameterRequiredError'
*       404:
*         $ref: '#/components/responses/InvalidCredentialsError'
*       420:
*         $ref: '#/components/responses/UnauthorizedError'
*       469:
*         $ref: '#/components/responses/ForbiddenError'
*       500:
*         $ref: '#/components/responses/ServerError'
*
* /api/driver/leaveOrder:
*   put:
*     tags:
*       - Driver (JWT required)
*     summary: Leave an accepted delivery order.
*     description: Allows a driver to unassign themselves from an order and revert it to pending.
*     parameters:
*       - name: orderId
*         in: query
*         description: The ID of the order to leave.
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Order left successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "You have left the order successfully."
*       403:
*         $ref: '#/components/responses/ParameterRequiredError'
*       404:
*         $ref: '#/components/responses/InvalidCredentialsError'
*       420:
*         $ref: '#/components/responses/UnauthorizedError'
*       469:
*         $ref: '#/components/responses/ForbiddenError'
*       500:
*         $ref: '#/components/responses/ServerError'
*
* /api/driver/getTheOrderIneedToDeliver:
*   get:
*     tags:
*       - Driver (JWT required)
*     summary: Retrieve the current delivery order.
*     description: Fetches the order with status `pending` or `processing` assigned to the authenticated driver.
*     responses:
*       200:
*         description: The current order, or a message indicating none.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Order found." 
*                 existingOrder:
*                   oneOf:
*                     - $ref: '#/components/schemas/Order'
*                     - type: "null"
*       420:
*         $ref: '#/components/responses/UnauthorizedError'
*       469:
*         $ref: '#/components/responses/ForbiddenError'
*       500:
*         $ref: '#/components/responses/ServerError'
*/