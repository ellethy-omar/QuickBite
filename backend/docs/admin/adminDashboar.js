
 /**
 * @swagger
 * tags:
 *   - name: Admin (JWT required)
 *     description: Admin endpoints for managing users, drivers, restaurants, and issuing warnings
 *
 * /api/admin/getAllUsers:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Fetch all users
 *     description: Returns a list of all user accounts.
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/getAllDrivers:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Fetch all drivers
 *     description: Returns a list of all driver accounts.
 *     responses:
 *       200:
 *         description: List of drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Driver'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/getAllRestaurants:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Fetch all restaurants
 *     description: Returns a list of all restaurant accounts.
 *     responses:
 *       200:
 *         description: List of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

 /**
 * @swagger
 * /api/admin/getAllProductsOfCertainRestaurant:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Fetch all products of a certain restaurant
 *     description: Returns a list of all products for the specified restaurant.
 *     parameters:
 *       - in: query
 *         name: restraurantID
 *         required: true
 *         schema:
 *           type: string
 *         description: The `_id` of the restaurant to retrieve products for.
 *     responses:
 *       200:
 *         description: List of products fetched successfully (or empty list if none found)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All products fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Restaurant not found.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
 /**
 * @swagger
 *
 * /api/admin/sendWarningToUser:
 *   post:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Send warning to a user
 *     description: Allows admin to issue a warning to a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - userId
 *               - message
 *     responses:
 *       200:
 *         description: Warning sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/sendWarningToDriver:
 *   post:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Send warning to a driver
 *     description: Allows admin to issue a warning to a driver.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - driverId
 *               - message
 *     responses:
 *       200:
 *         description: Warning sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/admin/sendWarningToRestaurant:
 *   post:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Send warning to a restaurant
 *     description: Allows admin to issue a warning to a restaurant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - restaurantId
 *               - message
 *     responses:
 *       200:
 *         description: Warning sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 */
