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
 */

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
