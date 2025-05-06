
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

/**
 * @swagger
 * /api/driver/getMyOrdersHistory:
 *   get:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Get delivery driver’s order history
 *     description: |
 *       Retrieves all orders for the authenticated driver that have been **delivered** or **cancelled**, including full details on the restaurant, the end user, and each item in the order.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order found."  # or "You do not have any orders."
 *                 existingOrder:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "650a12bd2f4c3a1234d56789"
 *                       status:
 *                         type: string
 *                         enum: [delivered, cancelled]
 *                         example: "delivered"
 *                       userID:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "640b98fa5e6a7b8c9d012345"
 *                           name:
 *                             type: string
 *                             example: "Jane Doe"
 *                           phone:
 *                             type: string
 *                             example: "+201234567890"
 *                           addresses:
 *                             type: array
 *                             items:
 *                               $ref: '#/components/schemas/UserAddress'
 *                       restaurantID:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "630c76ab1d2e3f4a5b678901"
 *                           name:
 *                             type: string
 *                             example: "Tasty Eats"
 *                           address:
 *                             type: object
 *                             properties:
 *                               street:
 *                                 type: string
 *                                 example: "123 Main St"
 *                               city:
 *                                 type: string
 *                                 example: "Cairo"
 *                               area:
 *                                 type: string
 *                                 example: "Zamalek"
 *                               _id:
 *                                 type: string
 *                           contact:
 *                             type: object
 *                             properties:
 *                               phone:
 *                                 type: string
 *                                 example: "+20111222333"
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
 *                                   example: "620d45ef9a8b7c6d5e4f3210"
 *                                 name:
 *                                   type: string
 *                                   example: "Margherita Pizza"
 *                                 price:
 *                                   type: number
 *                                   example: 7.5
 *                                 category:
 *                                   type: string
 *                                   example: "Pizza"
 *                                 description:
 *                                   type: string
 *                                   example: "Classic cheese and tomato"
 *                                 image:
 *                                   type: string
 *                                   example: "https://cdn.example.com/pizza.jpg"
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             _id:
 *                               type: string
 *                               example: "75ab12cd34ef56gh78ij90kl"
 *                       totalAmount:
 *                         type: number
 *                         example: 15.0
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-30T12:34:56.789Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-01T08:21:10.123Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
