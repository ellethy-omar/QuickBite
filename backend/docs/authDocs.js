//! LOGIN
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
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
 *         description: Bad request - either credentials are missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Both username/email and password are required or Invalid credentials
 *       500:
 *         description: Server error during login. Report to Omar
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
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
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
 *         description: Bad request - missing fields, invalid email, weak password, or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields are required or Invalid email address or Password is not strong enough or User already exists
 *       500:
 *         description: Server error during registration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error during registration
 */


//! VERIFY
/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     tags:
 *       - Authentication
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
 */