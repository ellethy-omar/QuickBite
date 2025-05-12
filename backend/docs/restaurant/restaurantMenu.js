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
 *     summary: Edit a product image
 *     description: Update the image for a specific product belonging to the authenticated restaurant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the product to update.
 *               imageBase64:
 *                 type: string
 *                 description: Base64‐encoded image data.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags to apply when uploading (must be a non‐empty array).
 *             required:
 *               - _id
 *               - imageBase64
 *               - tags
 *     responses:
 *       200:
 *         description: Image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image updated successfully"
 *                 image:
 *                   type: string
 *                   format: uri
 *                   description: URL of the newly uploaded product image.
 *       403:
 *         $ref: '#/components/responses/ParameterRequiredError'
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
 *
 * /api/restaurant/deleteProduct:
 *   delete:
 *     tags:
 *       - Restaurant (JWT required)
 *     summary: Delete a product
 *     description: Allows a restaurant to delete one of its own products via query string.
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete.
 *     responses:
 *       200:
 *         description: Product has been deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         $ref: '#/components/responses/ParameterRequiredError'
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: Product not found
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
