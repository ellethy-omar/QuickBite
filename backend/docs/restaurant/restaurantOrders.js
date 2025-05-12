/**
 * @swagger
 * /api/restaurant/getRestaurantAllCalledOrders:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Fetch new "called" orders
 *     description: Retrieve all new orders with status "called" (awaiting restaurant acceptance) for the authenticated restaurant.
 *     responses:
 *       200:
 *         description: Called orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Called orders fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/restaurant/getRestaurantAllRequiredOrders:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Fetch pending/processing orders
 *     description: Retrieve all orders with status "pending" or "processing" that require fulfillment for the authenticated restaurant.
 *     responses:
 *       200:
 *         description: Required orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Required orders fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/restaurant/acceptOrder:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Accept a "called" order
 *     description: Accept an order by changing its status from "called" to "pending"
 *     parameters:
 *       - in: query
 *         name: orderID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to accept
 *     responses:
 *       200:
 *         description: Order accepted successfully
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
 *       400:
 *         description: Order ID is required
 *       404:
 *         description: Order not found or not in "called" status
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */ 

/**
 * @swagger
 * /api/restaurant/rejectOrder:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Reject a "called" order
 *     description: Reject an order by changing its status from "called" to "cancelled"
 *     parameters:
 *       - in: query
 *         name: orderID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to reject
 *     responses:
 *       200:
 *         description: Order rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order rejected successfully"
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Order ID is required
 *       404:
 *         description: Order not found or not in "called" status
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/restaurant/getOrdersHistory:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Fetch order history
 *     description: Retrieve all orders (with any status) for the authenticated restaurant.
 *     responses:
 *       200:
 *         description: Order history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order history fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */