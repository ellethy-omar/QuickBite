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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     addresses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           area:
 *                             type: string
 *                           street:
 *                             type: string
 *                           building:
 *                             type: string
 *                           floor:
 *                             type: string
 *                           apartment:
 *                             type: string
 *                           isDefault:
 *                             type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - JWT is missing or invalid.
 *       500:
 *         description: Server error. Call Omar
 */

/**
 * @swagger
 * /api/user/updateUserProfilePhoto:
 *   put:
 *     tags:
 *       - User (JWT required)
 *     summary: Update user profile photo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       505:
 *         description: Not implemented yet
 */

/**
 * @swagger
 * /api/user/restUserPassword:
 *   post:
 *     tags:
 *       - User (JWT required)
 *     summary: Reset user password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       505:
 *         description: Not implemented yet
 */

/**
 * @swagger
 * /api/user/createOrder:
 *   post:
 *     tags:
 *       - User (JWT required)
 *     summary: Create a new order
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
 */

/**
 * @swagger
 * /api/user/cancelOrder:
 *   put:
 *     tags:
 *       - User (JWT required)
 *     summary: Cancel an order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *     responses:
 *       505:
 *         description: Not implemented yet
 */
