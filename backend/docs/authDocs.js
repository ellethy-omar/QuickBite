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
 *                   type: object
 *                   description: The authenticated user's data.
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: testUser
 *                     email:
 *                       type: string
 *                       example: test@gmail.com
 *                     password:
 *                       type: string
 *                       description: The hashed password.
 *                       example: "$2b$10$BpRqUKQ6w30GBnYKs.SCU.zDJwMTLgzL9Zg8UT944dc40gTMiUv7W"
 *                     _id:
 *                       type: string
 *                       example: "67f82916026f7415b5c254f0"
 *                     addresses:
 *                       type: array
 *                       items:
 *                         type: object
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-10T20:28:38.148Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY3ZjgyOWY2MDI2Zjc0MTViNWMyNTRmMCIsImlhdCI6MTc0NDMxNjkxOCwiZXhwIjoxNzQ0NTc2MTE4fQ.qhDHvIN4axeovWd4960i27FRWte20r4eMtGlPFruuMI"
 *       400:
 *         $ref: '#/components/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/InvalidCredentialsError'
 *       500:
 *         description: Server error during login. Call Omar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error during login
 */


//! REGISTER
/**
 * @swagger
 * /api/auth/registerUser:
 *   post:
 *     tags:
 *       - Authentication (No JWT required)
 *     summary: Register a new user
 *     description: Create a new user account by providing a username, email, and password. The endpoint validates the input (checks for missing fields, valid email, and strong password) and returns a JWT token upon successful registration.
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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67f829f6026f7415b5c254f0
 *                     name:
 *                       type: string
 *                       example: testUser
 *                     email:
 *                       type: string
 *                       example: test@gmail.com
 *                     password:
 *                       type: string
 *                       example: $2b$10$BpRqUKQ6w30GBnYKs.SCU.zDJwMTLgzL9Zg8UT944dc40gTMiUv7W
 *                     addresses:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-10T20:28:38.148Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY3ZjgyOWY2MDI2Zjc0MTViNWMyNTRmMCIsImlhdCI6MTc0NDMxNjkxOCwiZXhwIjoxNzQ0NTc2MTE4fQ.qhDHvIN4axeovWd4960i27FRWte20r4eMtGlPFruuMI
 *       400:
 *         $ref: '#/components/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/InvalidCredentialsError'
 *       500:
 *         description: Server error during registration. Call Omar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error during registration
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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6801fb9eab8d7be033776eb1
 *                     name:
 *                       type: string
 *                       example: Ali Mansour
 *                     email:
 *                       type: string
 *                       example: ali.driver@example.com
 *                     phone:
 *                       type: number
 *                       example: 1234567890
 *                     password:
 *                       type: string
 *                       example: $2b$10$FihHAAoUZ5EbvztJ6dTiV.thIAa/P4/yzLlR6QnpvHCHFxgF044LG
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-18T07:13:34.929Z
 *                     __v:
 *                       type: number
 *                       example: 0
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         $ref: '#/components/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/InvalidCredentialsError'
 *       500:
 *         description: Server error during registration
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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6801fb9eab8d7be033776eb1
 *                     name:
 *                       type: string
 *                       example: Ali Mansour
 *                     email:
 *                       type: string
 *                       example: ali.driver@example.com
 *                     phone:
 *                       type: number
 *                       example: 1234567890
 *                     password:
 *                       type: string
 *                       example: $2b$10$FihHAAoUZ5EbvztJ6dTiV.thIAa/P4/yzLlR6QnpvHCHFxgF044LG
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-18T07:13:34.929Z
 *                     __v:
 *                       type: number
 *                       example: 0
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         $ref: '#/components/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/InvalidCredentialsError'
 *       500:
 *         description: Server error during login
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
 *         $ref: '#/components/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/InvalidCredentialsError'
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
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Pizza Palace
 *                     description:
 *                       type: string
 *                       example: Best pizza in town
 *                     cuisineType:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "Italian", "Pizza" ]
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: 123 Main St
 *                         city:
 *                           type: string
 *                           example: Cairo
 *                         area:
 *                           type: string
 *                           example: Downtown
 *                     contact:
 *                       type: object
 *                       properties:
 *                         phone:
 *                           type: string
 *                           example: 01012345678
 *                         email:
 *                           type: string
 *                           example: contact@pizzapalace.com
 *                         password:
 *                           type: string
 *                           example: "$2b$10$rIKa2FOOYLmnVzfjttYjP.6wfFh/Wh125KsPh.EabKMGDmBBuAASG"
 *                     openingHours:
 *                       type: object
 *                       properties:
 *                         sunday:
 *                           type: object
 *                           properties:
 *                             open:
 *                               type: string
 *                               example: "10:00"
 *                             close:
 *                               type: string
 *                               example: "22:00"
 *                         monday:
 *                           type: object
 *                           properties:
 *                             open:
 *                               type: string
 *                               example: "10:00"
 *                             close:
 *                               type: string
 *                               example: "22:00"
 *                         # ... similar for the rest of the days
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     logo:
 *                       type: string
 *                       example: "default-logo.jpg"
 *                     coverImage:
 *                       type: string
 *                       example: "default-cover.jpg"
 *                     _id:
 *                       type: string
 *                       example: "680200ac46d93565c3eca540"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-18T07:35:08.753Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-18T07:35:08.753Z"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODAyMDBhYzQ2ZDkzNTY1YzNlY2E1NDAiLCJyb2xlIjoicmVzdGF1cmFudCIsImlhdCI6MTc0NDk2MTcwOCwiZXhwIjoxNzQ1MjIwOTA4fQ.kNKr7onVB5F2ddvYDJQzaQbpGbCAN1CCYOo5A8yfPos"
 *       400:
 *         $ref: '#/components/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/InvalidCredentialsError'
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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 680200ac46d93565c3eca540
 *                     name:
 *                       type: string
 *                       example: Pizza Palace
 *                     description:
 *                       type: string
 *                       example: Best pizza in town
 *                     cuisineType:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "Italian", "Pizza" ]
 *                     rating:
 *                       type: number
 *                       example: 0
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: 123 Main St
 *                         city:
 *                           type: string
 *                           example: Cairo
 *                         area:
 *                           type: string
 *                           example: Downtown
 *                         _id:
 *                           type: string
 *                           example: 680200ac46d93565c3eca541
 *                     contact:
 *                       type: object
 *                       properties:
 *                         phone:
 *                           type: string
 *                           example: 01012345678
 *                         email:
 *                           type: string
 *                           example: contact@pizzapalace.com
 *                         password:
 *                           type: string
 *                           example: $2b$10$rIKa2FOOYLmnVzfjttYjP.6wfFh/Wh125KsPh.EabKMGDmBBuAASG
 *                         _id:
 *                           type: string
 *                           example: 680200ac46d93565c3eca542
 *                     openingHours:
 *                       type: object
 *                       example:
 *                         sunday: { open: "10:00", close: "22:00", _id: "680200ac46d93565c3eca544" }
 *                         monday: { open: "10:00", close: "22:00", _id: "680200ac46d93565c3eca545" }
 *                         tuesday: { open: "10:00", close: "22:00", _id: "680200ac46d93565c3eca546" }
 *                         wednesday: { open: "10:00", close: "22:00", _id: "680200ac46d93565c3eca547" }
 *                         thursday: { open: "10:00", close: "22:00", _id: "680200ac46d93565c3eca548" }
 *                         friday: { open: "10:00", close: "23:00", _id: "680200ac46d93565c3eca549" }
 *                         saturday: { open: "10:00", close: "23:00", _id: "680200ac46d93565c3eca54a" }
 *                         _id: 680200ac46d93565c3eca543
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     logo:
 *                       type: string
 *                       example: default-logo.jpg
 *                     coverImage:
 *                       type: string
 *                       example: default-cover.jpg
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-18T07:35:08.753Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-18T07:35:08.753Z
 *                     __v:
 *                       type: number
 *                       example: 0
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         $ref: '#/components/InvalidCredentialsError'
 *       403:
 *         $ref: '#/components/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/InvalidCredentialsError'
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