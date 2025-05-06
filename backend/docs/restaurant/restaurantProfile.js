/**
 * @swagger
 * tags:
 *   - name: Restaurant (JWT required)
 *     description: Endpoints related to restaurant operations and orders. Only restaurants can use these apis
 */


/**
 * @swagger
 * tags:
 *   - name: Restaurant (JWT required)
 *
 * /api/restaurant/getRestaurantProfie:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Retrieve the authenticated restaurant's profile
 *     description: Requires JWT authentication. Returns the restaurant profile associated with the current user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restaurant profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   $ref: '#/components/schemas/Restaurant'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'

 * /api/restaurant/updateRestaurantProfile:
*   put:
*     tags:
*       - Restaurant (JWT required)
*     summary: Update restaurant profile
*     description: Allows a restaurant to update its profile details such as name, description, cuisine type, address, contact, and opening hours.
*     requestBody:
*       description: Restaurant profile details to be updated
*       content:
*         application/json:
*           required: true
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 description: Name of the restaurant
*               description:
*                 type: string
*                 description: Description of the restaurant
*               cuisineType:
*                 type: array
*                 items:
*                   type: string
*                 description: List of cuisine types (e.g., Italian, Pizza)
*               address:
*                 $ref: '#/components/schemas/restaurantAddress'
*               contact:
*                 $ref: '#/components/schemas/UserAddress'
*               openingHours:
*                 type: object
*                 description: Object containing opening hours for each day of the week
*               isActive:
*                 type: boolean
*                 description: Status of the restaurant (active or inactive)
*             required:
*               - name
*               - description
*               - cuisineType
*               - address
*               - contact
*               - openingHours
*     responses:
*       200:
*         description: Restaurant profile updated successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Restaurant profile updated successfully"
*                 restaurant:
*                   $ref: '#/components/schemas/Restaurant'
*       404:
*         $ref: '#/components/responses/InvalidCredentialsError'
*       420:
*         $ref: '#/components/responses/UnauthorizedError'
*       469:
*         $ref: '#/components/responses/ForbiddenError'
*       500:
*         $ref: '#/components/responses/ServerError'
 */


/**
 * @swagger
 * /api/restaurant/updateRestaurantLogo:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Edit an existing logo of the restaurant
 *     description: Update the logo that belongs to the authenticated restaurant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UploadImagePayload'
 *     responses:
 *       200:
 *         description: User profile updated successfully
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
 * /api/restaurant/updateRestaurantCoverImage:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Edit an cover image of the restaurant
 *     description: Update the cover image that belongs to the authenticated restaurant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UploadImagePayload'
 *     responses:
 *       200:
 *         description: User profile updated successfully
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