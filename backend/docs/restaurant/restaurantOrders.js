
/**
 * @swagger
 * /api/restaurant/getRestaurantAllRequiredOrders:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Fetch new required orders
 *     description: Retrieve all new orders that require action for the authenticated restaurant.
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */


/**
 * @swagger
 * /api/restaurant/getRestaurantAllOrders:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Fetch ALL required orders
 *     description: Retrieve ALL orders that require action for the authenticated restaurant.
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */