
/**
 * @swagger
 * /api/auth/loginUser:
 *   post:
 *     tags:
 *       - Authentication (No JWT required)
 *     summary: Login an existing user
 *     description: Authenticate an existing user using either a username or email along with a password. Returns the user information and a JWT token if the credentials are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usernameOrEmail
 *               - password
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 description: The user's username or email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY3ZjgyOWY2MDI2Zjc0MTViNWMyNTRmMCIsImlhdCI6MTc0NDMxNjkxOCwiZXhwIjoxNzQ0NTc2MTE4fQ.qhDHvIN4axeovWd4960i27FRWte20r4eMtGlPFruuMI"
 *       400:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/auth/loginRestaurant:
 *   post:
 *     tags: 
 *       - Authentication (No JWT required)
 *     summary: Login an existing restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrPhone
 *               - password
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *                 example: contact@pizzapalace.com
 *               password:
 *                 type: string
 *                 example: P@ssw0rdStrong!
 *     responses:
 *       200:
 *         description: Restaurant logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 restaurant: 
 *                   $ref: '#/components/schemas/Restaurant'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/auth/loginAdmin:
 *   post:
 *     tags:
 *       - Authentication (No JWT required)
 *     summary: Login an existing admin
 *     description: Authenticate an existing admin using the email and password. Returns the admin information and a JWT token if the credentials are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 description: The admin's email or username.
 *               password:
 *                 type: string
 *                 description: The admin's password.
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY3ZjgyOWY2MDI2Zjc0MTViNWMyNTRmMCIsImlhdCI6MTc0NDMxNjkxOCwiZXhwIjoxNzQ0NTc2MTE4fQ.qhDHvIN4axeovWd4960i27FRWte20r4eMtGlPFruuMI"
 *       400:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */


/**
 * @swagger
 * /api/auth/loginDriver:
 *   post:
 *     tags: 
 *       - Authentication (No JWT required)
 *     summary: Login an existing driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrPhone
 *               - password
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *                 example: ali.driver@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassw0rd!
 *     responses:
*       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 driver:
 *                   $ref: '#/components/schemas/Driver'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
