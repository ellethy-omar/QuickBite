/**
 * @swagger
 * /api/auth/forgotPassword:
 *   post:
 *     tags:
 *       - Authentication (No JWT required)
 *     summary: Send a password reset token via email
 *     description: |
 *       Generates a short‑lived JWT reset token for the given user role and email,  
 *       then emails that token to the user’s address. Token expires in 15 minutes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: driver@example.com
 *               role:
 *                 type: string
 *                 enum: [user, driver, restaurant, admin]
 *                 example: driver
 *     responses:
 *       200:
 *         description: Password reset token sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset link sent, check spam folder"
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/auth/resetPassword:
 *   post:
 *     tags:
 *       - Authentication (No JWT required)
 *     summary: Reset user password using token
 *     description: |
 *       Verifies the short‑lived JWT reset token, checks password strength,  
 *       and updates the user’s (or driver’s / restaurant’s / admin’s) password.  
 *       For restaurants, the password field is nested under `contact.password`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *               - role
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT reset token from email
 *               password:
 *                 type: string
 *                 description: New strong password
 *                 example: "Secur3P@ssw0rd!"
 *               role:
 *                 type: string
 *                 enum: [user, driver, restaurant, admin]
 *                 example: driver
 *     responses:
 *       200:
 *         description: Password reset successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successful"
 *       403:
 *         description: Missing or invalid parameters, or password not strong enough.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Password is not strong enough"
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */