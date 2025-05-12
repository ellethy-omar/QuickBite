
 /**
 * @swagger
 * tags:
 *   - name: Admin (JWT required)
 *     description: Admin endpoints for managing users, drivers, restaurants, and issuing warnings
 * /api/admin/banUser:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Ban a user
 *     description: Allows admin to ban a user account via query string.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User has been banned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request - missing userId
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/banDriver:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Ban a driver
 *     description: Allows admin to ban a driver account via query string.
 *     parameters:
 *       - in: query
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Driver has been banned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request - missing driverId
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/banRestaurant:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Ban a restaurant
 *     description: Allows admin to ban a restaurant account via query string.
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant has been banned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request - missing restaurantId
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/unBanUser:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Unban a user
 *     description: Allows admin to unban a user account via query string.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User has been unbanned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request - missing userId
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/unBanDriver:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Unban a driver
 *     description: Allows admin to unban a driver account via query string.
 *     parameters:
 *       - in: query
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Driver has been unbanned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request - missing driverId
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/unBanRestaurant:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Unban a restaurant
 *     description: Allows admin to unban a restaurant account via query string.
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant has been unbanned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request - missing restaurantId
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

 /**
 * @swagger
 * tags:
 *   - name: Admin (JWT required)
 *     description: Admin endpoints for managing users, drivers, restaurants, products, and issuing warnings
 *
 * /api/admin/banProduct:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Ban a product
 *     description: Allows admin to ban a product by ID and send a notification with a reason to the restaurant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to ban.
 *               reason:
 *                 type: string
 *                 description: The reason for banning the product.
 *             required:
 *               - productId
 *               - reason
 *     responses:
 *       200:
 *         description: Product has been banned and notification sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request – missing productId or reason
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: Product not found
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/unBanProduct:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Unban a product
 *     description: Allows admin to unban a product by ID.
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to unban.
 *     responses:
 *       200:
 *         description: Product has been unbanned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request – missing productId
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
