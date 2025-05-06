
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Authorization token required or invalid
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Authorization token required
 *     ForbiddenError:
 *       description: Forbidden. Role not authorized.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Access denied, you don't have the authority to do this!
 *     ParameterRequiredError:
 *       description: A required parameter is missing in the request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Any thing can be required, I have tried
 *     UserAlreadyExistsError:
 *       description: The user already exists in the system
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: User already exists
 *     InvalidCredentialsError:
 *       description: Invalid login credentials provided
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Invalid credentials
 */

/**
 * @swagger
 * components:
 *   responses:
 *     ServerError:
 *       description: Server error. Call Omar
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "If you see status 500 tell me, thsi is not an example"
 *   ImageUploadSuccess:
 *       description: Returned when the image is saved successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageUploadResponse'
 */