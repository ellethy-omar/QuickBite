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
