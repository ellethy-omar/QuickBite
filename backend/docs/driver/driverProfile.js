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
 * 
 * */
 /**
 * @swagger
 * paths:
 *   /api/driver/updateDriverProfile:
 *     put:
 *       tags:
 *         - Driver (JWT required)
 *       summary: Submit a driver profile update request
 *       description: |
 *         Creates a pending Request for updating the authenticated driver's profile fields  
 *         (name, email, phone, vehicle). Admin approval is required before changes take effect.
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The driver's new name.
 *                   example: "Anas alaa"
 *                 email:
 *                   type: string
 *                   description: The driver's new email.
 *                   example: "annasalaa597@gmail.com"
 *                 phone:
 *                   type: string
 *                   description: The driver's new phone number.
 *                   example: "1456575156"
 *                 vehicle:
 *                   type: object
 *                   description: The driver's new vehicle details.
 *                   properties:
 *                     plateNumber:
 *                       type: string
 *                       description: Vehicle plate number.
 *                       example: "XYZ1234"
 *                     model:
 *                       type: string
 *                       description: Vehicle model.
 *                       example: "Racism"
 *       responses:
 *         '200':
 *           description: Profile update request submitted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Profile update request submitted successfully. Waiting for admin approval."
 *                   requestId:
 *                     type: string
 *                     format: objectId
 *                     description: The ID of the created Request document
 *                     example: "6820fa42f342c482d43eccdc"
 *         '420':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '469':
 *           $ref: '#/components/responses/ForbiddenError'
 *         '500':
 *           $ref: '#/components/responses/ServerError'
 *
 *   /api/driver/updateDriverProfilePhoto:
 *     put:
 *       tags:
 *         - Driver (JWT required)
 *       summary: Submit a driver profile photo update request
 *       description: |
 *         Uploads a new profile photo (base64) to Cloudinary with temporary tags,  
 *         then creates a pending Request for admin approval before applying it.
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - imageBase64
 *                 - tags
 *               properties:
 *                 imageBase64:
 *                   type: string
 *                   description: The driver’s new profile image in Base64 encoding.
 *                 tags:
 *                   type: array
 *                   description: Array of tag strings to apply (will add temporary & pending_approval).
 *                   items:
 *                     type: string
 *                   example: ["driver", "pizza", "special"]
 *       responses:
 *         '200':
 *           description: Profile photo update request submitted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Profile photo update request submitted successfully. Waiting for admin approval."
 *                   requestId:
 *                     type: string
 *                     format: objectId
 *                     example: "6820fa42f342c482d43eccdc"
 *                   temporaryImageUrl:
 *                     type: string
 *                     format: uri
 *                     description: URL of the temporarily uploaded image
 *                     example: "https://res.cloudinary.com/dr1sqiouu/image/upload/v1746991682/m9d57tltimj7gh2tzqjl.jpg"
 *         '403':
 *           $ref: '#/components/responses/ParameterRequiredError'
 *         '420':
 *           $ref: '#/components/responses/UnauthorizedError'
 *         '469':
 *           $ref: '#/components/responses/ForbiddenError'
 *         '500':
 *           $ref: '#/components/responses/ServerError'
 */
