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
 *     description: Endpoints for managing restaurant profiles and menu products
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


 * /api/restaurant/updateRestaurantProfilePhoto:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Update restaurant profile photo
 *     description: Allows the restaurant to upload or update its profile photo.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageBase64:
 *                 type: string
 *                 description: Base64 encoded image data for the profile photo.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of tags associated with the image.
 *             required:
 *               - imageBase64
 *               - tags
 *     responses:
 *       200:
 *         description: Profile photo updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Image updated successfully'
 *                 Restaurant:
 *                   $ref: '#/components/schemas/Restaurant'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/restaurant/getRestaurantProducts:
 *   get:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Get all products belonging to the authenticated restaurant
 *     description: Fetch all products that are associated with the restaurant's ID derived from the authenticated user.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: products are in an array
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/restaurant/addRestaurantProduct:
 *   post:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Add a new product for the authenticated restaurant
 *     description: Allows a restaurant to add a new product by providing necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - isAvailable
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stockAvailable:
 *                 type: number
 *               category:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/restaurant/editRestaurantProduct:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Edit an existing product of the restaurant
 *     description: Update product details for an existing product that belongs to the authenticated restaurant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
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
 * /api/restaurant/editRestaurantProductImage:
 *   put:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Edit an existing product image of the restaurant
 *     description: Update the image for an existing product that belongs to the authenticated restaurant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - imageBase64
 *               - tags
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The unique ID of the product to update
 *               imageBase64:
 *                 type: string
 *                 description: Base64 encoded image string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of tags to categorize the image
 *     responses:
 *       200:
 *         description: Product image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image updated successfully"
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       404:
 *         $ref: '#/components/responses/InvalidCredentialsError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
