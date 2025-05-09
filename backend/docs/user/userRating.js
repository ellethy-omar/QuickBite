/**
 * @swagger
 * /api/user/rateDriver:
 *   post:
 *     tags:
 *       - User (JWT required)
 *     summary: Rate a driver
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Provide the driver ID and rating (0–5)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - driverId
 *               - rating
 *             properties:
 *               driverId:
 *                 type: string
 *                 example: "60f6c2a9b1234a5d6e7f8a9b"
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 4.5
 *     responses:
 *       200:
 *         description: Driver rated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Driver rated successfully"
 *                 newRating:
 *                   type: number
 *                   example: 4.27
 *                 totalRatings:
 *                   type: integer
 *                   example: 123
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
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
 * /api/user/rateRestaurant:
 *   post:
 *     tags:
 *       - User (JWT required)
 *     summary: Rate a restaurant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Provide the restaurant ID and rating (0–5)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *               - rating
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 example: "60f6c3b4c2345d6e7f8a9b01"
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 3.8
 *     responses:
 *       200:
 *         description: Restaurant rated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Restaurant rated successfully"
 *                 newRating:
 *                   type: number
 *                   example: 4.12
 *                 totalRatings:
 *                   type: integer
 *                   example: 456
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
  *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 */

/**
 * @swagger
 * /api/user/rateProduct:
 *   post:
 *     tags:
 *       - User (JWT required)
 *     summary: Rate a product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Provide the product ID and rating (0–5)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - rating
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60f6c3b4c2345d6e7f8a9b01"
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 3.8
 *     responses:
 *       200:
 *         description: Product rated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product rated successfully"
 *                 newRating:
 *                   type: number
 *                   example: 4.12
 *                 totalRatings:
 *                   type: integer
 *                   example: 456
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
  *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 */