/**
 * @swagger
 * tags:
 *   - name: User (JWT required)
 *     description: Endpoints related to user operations and orders. Only users can use these apis
 */

/**
 * @swagger
 * /api/user/getUserProfile:
 *   get:
 *     tags:
 *       - User (JWT required)
 *     summary: Get the authenticated user's profile.
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 */

/**
 * @swagger
 * /api/user/updateUserProfile:
 *   put:
 *     tags:
 *       - User (JWT required)
 *     summary: Update user profile information including name, email, phone, and addresses.
 *     description: >
 *       This endpoint updates the authenticated user's profile details.  
 *       - You can update name, email, and phone individually.  
 *       - The `addresses` field accepts an array of address objects.  
 *         - If an address object includes an `_id`, it is treated as an update to an existing address.  
 *         - If an address object does not include an `_id`, it is treated as a new address and added to the profile.  
 *         - Addresses not included in the request will be removed from the user's address list.
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
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               phone:
 *                 type: string
 *                 description: The phone number of the user.
 *               addresses:
 *                 type: array
 *                 description: >
 *                   A list of address objects to add or update.  
 *                   - Use `_id` to update an existing address.  
 *                   - Omit `_id` to add a new address.
 *                 items:
 *                   $ref: '#/components/schemas/UserAddress'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/user/updateUserProfilePhoto:
 *   put:
 *     tags:
 *       - User (JWT required)
 *     summary: Update user profile information
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
 *         description: User profile updated successfully
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
 */

/**
 * @swagger
 * /api/user/createOrder:
 *   post:
 *     tags:
 *       - User (JWT required)
 *     summary: "Create a new order"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantID:
 *                 type: string
 *                 description: ID of the restaurant where the order is placed
 *                 example: "60d2145f1b8b1f20d1e71234"
 *               items:
 *                 type: array
 *                 description: List of items in the order
 *                 items:
 *                   $ref: '#/components/schemas/Item'
 *               address:
 *                 $ref: '#/components/schemas/UserAddress'
 *     responses:
 *       201:
 *         description: "Order created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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
 */

/**
 * @swagger
 * /api/user/getMyOrders:
 *   get:
 *     tags:
 *       - User (JWT required)
 *     summary: Get all orders for the authenticated user.
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
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/user/getAllRestaurants:
 *   get:
 *     tags:
 *       - User (JWT required)
 *     summary: "Get all restaurants"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "List of all restaurants"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
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
 * /api/user/getProductsForRestaurant:
 *   get:
 *     tags:
 *       - User (JWT required)
 *     summary: "Get products for a specific restaurant"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "restraurantID"
 *         in: "query"
 *         required: true
 *         type: "string"
 *         description: "Restaurant ID"
 *         example: "60d2145f1b8b1f20d1e71234"
 *     responses:
 *       200:
 *         description: "List of products for the restaurant"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
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
 */


/**
 * @swagger
 * /api/user/updateOrder:
 *   put:
 *     tags:
 *       - User (JWT required)
 *     summary: Update an order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       505:
 *         description: Not implemented yet
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/user/cancelOrder:
 *   put:
 *     tags:
 *       - User (JWT required)
 *     summary: Cancel an order
 *     description: Cancels an order by updating its status to 'cancelled' based on the provided order ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: orderID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to be cancelled.
 *     responses:
 *       200:
 *         description: Order cancelled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order cancelled successfully"
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 */
