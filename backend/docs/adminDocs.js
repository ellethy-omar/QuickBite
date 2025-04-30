/**
 * @swagger
 * tags:
 *   - name: Admin (JWT required)
 *     description: Endpoints related to admin operations and orders. Only admins can use these apis
 */

/**
 * @swagger
 * tags:
 *   - name: Admin (JWT required)
 *     description: Admin endpoints for profile management and user moderation
 *
 * /api/admin/getAdminProfile:
 *   get:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Get admin profile
 *     description: Returns the authenticated admin's profile.
 *     responses:
 *       200:
 *         description: Admin profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/admin/updateAdminProfile:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Update admin profile
 *     description: Allows admin to update their profile info.
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

* /api/admin/updateAdminProfilePhoto:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Update admin profile information
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
 *         description: Admin profile updated successfully
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

 * /api/admin/sendwarningToUser:
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
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

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
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

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
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/admin/banUser:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Ban a user
 *     description: Allows admin to ban a user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/admin/banDriver:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Ban a driver
 *     description: Allows admin to ban a driver account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/admin/banRestaurant:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Ban a restaurant
 *     description: Allows admin to ban a restaurant account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/admin/unBanUser:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Unban a user
 *     description: Allows admin to unban a user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/admin/unBanDriver:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Unban a driver
 *     description: Allows admin to unban a driver account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/admin/unBanRestaurant:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Unban a restaurant
 *     description: Allows admin to unban a restaurant account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *     responses:
 *       505:
 *         description: Not implemented
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 */
