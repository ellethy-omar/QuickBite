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
 *       401:
 *         description: Unauthorized

 * /api/admin/updateAdminProfile:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Update admin profile
 *     description: Allows admin to update their profile info.
 *     responses:
 *       505:
 *         description: Not implemented

 * /api/admin/updateAdminProfilePhoto:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Update admin profile photo
 *     description: Allows admin to update their profile photo.
 *     responses:
 *       505:
 *         description: Not implemented

 * /api/admin/restAdminPassword:
 *   post:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Reset admin password
 *     description: Allows admin to change their password.
 *     responses:
 *       505:
 *         description: Not implemented

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
 */
