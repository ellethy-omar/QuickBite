/**
 * @swagger
 * tags:
 *   - name: Restaurant (JWT required)
 *     description: Endpoints related to restaurant operations and orders. Only restaurants can use these apis
 */

/**
 * @swagger
 * tags:
 *   - name: Restaurant (JWT required)
 *     description: Endpoints for managing restaurant profiles and menu products
 *
 * /api/restaurant/getRestaurantProfie:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Get the restaurant profile
 *     description: Returns the authenticated restaurant's profile.
 *     responses:
 *       200:
 *         description: Restaurant profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/restaurant/updateRestaurantProfile:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Update the restaurant profile
 *     description: Allows the restaurant to update its profile information.
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/restaurant/updateRestaurantProfilePhoto:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Update restaurant profile photo
 *     description: Allows the restaurant to upload/update its profile photo.
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/restaurant/resetRestaurantPassword:
 *   post:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Reset restaurant password
 *     description: Allows the restaurant to change its password.
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/restaurant/getRestaurantProducts:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Get all products for the restaurant
 *     description: Returns a list of all products created by the authenticated restaurant.
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/restaurant/addRestaurantProduct:
 *   post:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Add a new product
 *     description: Adds a new product to the restaurant's menu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: object
 *                 description: Product object to add
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/restaurant/editRestaurantProduct:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Edit a product
 *     description: Updates a specific product in the restaurant's menu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: object
 *                 description: Product object to update
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 */
