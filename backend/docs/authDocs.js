/**
 * @swagger
 * tags:
 *   - name: Authentication (No JWT required)
 *     description: Endpoints related to signing up and logging in for any user type.
 */

//! LOGIN
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


//! REGISTER
/**
 * @swagger
 * /api/auth/registerUser:
 *   post:
 *     tags:
 *       - Authentication (No JWT required)
 *     summary: Register a new user
 *     description: Create a new user account by providing a username, email, password, phone, and address information. The endpoint validates the input (checks for required fields, valid email, and strong password) and returns a JWT token upon successful registration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The desired username for the new user.
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *               addresses:
 *                 type: array
 *                 description: A list of address objects for the user.
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       example: Home
 *                     area:
 *                       type: string
 *                       example: Downtown
 *                     street:
 *                       type: string
 *                       example: Main St
 *                     building:
 *                       type: string
 *                       example: Building A
 *                     floor:
 *                       type: string
 *                       example: 3
 *                     apartment:
 *                       type: string
 *                       example: 302
 *                     isDefault:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY3ZjgyOWY2MDI2Zjc0MTViNWMyNTRmMCIsImlhdCI6MTc0NDMxNjkxOCwiZXhwIjoxNzQ0NTc2MTE4fQ.qhDHvIN4axeovWd4960i27FRWte20r4eMtGlPFruuMI
 *       400:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       410:
 *         $ref: '#/components/responses/UserAlreadyExistsError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
/**
 * @swagger
 * /api/auth/registerDriver:
 *   post:
 *     tags: 
 *       - Authentication (No JWT required)
 *     summary: Register a new driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ali Mansour
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ali.driver@example.com
 *               phone:
 *                 type: number
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassw0rd!
 *               vehicle:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: car
 *                   plateNumber:
 *                     type: string
 *                     example: ABC-1234
 *     responses:
 *       201:
 *         description: Driver registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Driver registered successfully
 *                 driver:
 *                   $ref: '#/components/schemas/Driver'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       410:
 *         $ref: '#/components/responses/UserAlreadyExistsError'
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


/**
 * @swagger
 * /api/auth/registerAdmin:
 *   post: 
 *     tags: 
 *       - Authentication (No JWT required)
 *     summary: Register a new admin
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auth/loginAdmin:
 *   post:
 *     tags: 
 *       - Authentication (No JWT required)
 *     summary: Login an existing admin
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       400:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 */

/**
 * @swagger
 * /api/auth/registerRestaurant:
 *   post:
 *     tags: 
 *       - Authentication (No JWT required)
 *     summary: Register a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - cuisineType
 *               - address
 *               - contact
 *               - openingHours
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               cuisineType:
 *                 type: array
 *                 items:
 *                   type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   area:
 *                     type: string
 *               contact:
 *                 type: object
 *                 required:
 *                   - email
 *                   - phone
 *                   - password
 *                 properties:
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   password:
 *                     type: string
 *               openingHours:
 *                 type: object
 *                 properties:
 *                   sunday:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: string
 *                       close:
 *                         type: string
 *                   monday:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: string
 *                       close:
 *                         type: string
 *                   tuesday:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: string
 *                       close:
 *                         type: string
 *                   wednesday:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: string
 *                       close:
 *                         type: string
 *                   thursday:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: string
 *                       close:
 *                         type: string
 *                   friday:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: string
 *                       close:
 *                         type: string
 *                   saturday:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: string
 *                       close:
 *                         type: string
 *     responses:
 *       201:
 *         description: Restaurant registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Restaurant registered successfully
 *                 restaurant: 
 *                   $ref: '#/components/schemas/Restaurant'
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODAyMDBhYzQ2ZDkzNTY1YzNlY2E1NDAiLCJyb2xlIjoicmVzdGF1cmFudCIsImlhdCI6MTc0NDk2MTcwOCwiZXhwIjoxNzQ1MjIwOTA4fQ.kNKr7onVB5F2ddvYDJQzaQbpGbCAN1CCYOo5A8yfPos"
 *       400:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       410:
 *         $ref: '#/components/responses/UserAlreadyExistsError'
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
 *       400:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

//! VERIFY
/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     tags:
 *       - Authentication (No JWT required)
 *     summary: Verify JWT token
 *     description: Validate the JWT provided in the Authorization header and return user details if the token is valid.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *                 user:
 *                   type: object
 *                   description: The decoded user data from the token
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67f829f6026f7415b5c254f0
 *                     role:
 *                       type: string
 *                       example: user
 *                     iat:
 *                       type: integer
 *                       example: 1744831147
 *                     exp:
 *                       type: integer
 *                       example: 1745090347
 *       401:
 *         description: Authorization token required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Authorization token required
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or expired token
 *       469:
 *         description: Access denied due to insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied, you don't have the authority to do this!
 */