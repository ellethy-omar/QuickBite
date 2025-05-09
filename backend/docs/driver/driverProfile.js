/**
 * @swagger
 * tags:
 *   - name: Driver (JWT required)
 *     description: Endpoints related to driver operations and orders. Only drivers can use these apis
 */

/**
 * @swagger
 * /api/driver/getDriverProfile:
 *   get:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Get the driver profile.
 *     description: Returns the profile of the authenticated driver.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved driver profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 driver:
 *                   $ref: '#/components/schemas/Driver'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 * /api/driver/updateDriverProfile:
 *   put:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Update the driver's profile information.
 *     description: Updates the profile details (name, email, phone, and vehicle) of the authenticated driver.
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
 *                 description: The driver's name.
 *               email:
 *                 type: string
 *                 description: The driver's email address.
 *               phone:
 *                 type: string
 *                 description: The driver's phone number.
 *               vehicle:
 *                 type: object
 *                 properties:
 *                   plateNumber:
 *                     type: string
 *                     description: The driver's vehicle plate number.
 *                   model:
 *                     type: string
 *                     description: The model of the driver's vehicle.
 *                   category:
 *                     type: string
 *                     description: The category of the driver's vehicle (e.g., sedan, van).
 *     responses:
 *       200:
 *         description: Driver profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Driver profile updated successfully"
 *                 driver:
 *                   $ref: '#/components/schemas/Driver'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
 * /api/driver/updateDriverProfilePhoto:
 *   put:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Update the driver's profile photo.
 *     description: Updates the profile photo of the authenticated driver.
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
 *         description: Driver profile updated successfully
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
 * 
 */