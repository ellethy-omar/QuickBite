
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
 * /api/admin/getAllOrdersForCertainUser:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Get all orders for a specific user
 *     description: |
 *       Fetches every order placed by the user with the given `userId`.  
 *       Returns detailed order information including restaurant and driver data.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID of the user whose orders to fetch
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All orders fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
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
 * /api/admin/getDriverOrdersHistory:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Get order history for a specific driver
 *     description: |
 *       Retrieves all orders assigned to the driver with the given `driverId`,  
 *       including populated restaurant, user, and item details.
 *     parameters:
 *       - in: query
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID of the driver whose order history is requested
 *     responses:
 *       '200':
 *         description: Order history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order found.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '403':
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       '420':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '469':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */

 /**
 * @swagger
 * /api/admin/getProcessingOrders:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Retrieve all orders (any status)
 *     description: |
 *       Fetches all orders in the system, including populated restaurant, user, and item details.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Array of Order objects
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '420':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '469':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
