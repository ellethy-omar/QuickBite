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

/**
 * @swagger
 * /api/admin/updateAdminProfile:
 *   put:
 *     tags:
 *       - Admin (JWT required)
 *     summary: Update admin profile
 *     description: Allows the authenticated admin to update their name, email, and/or phone.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *             example:
 *               name: "New Admin Name"
 *               email: "admin@example.com"
 *               phone: "+1234567890"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *          $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *


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
 */

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
