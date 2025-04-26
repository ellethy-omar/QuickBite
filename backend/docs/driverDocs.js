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
 *     responses:
 *       200:
 *         description: The driver profile was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 driver:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized, JWT missing or invalid.
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 * 
 * /api/driver/updateDriverProfile:
 *   put:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Update the driver's profile.
 *     description: Updates the profile details of the authenticated driver.
 *     responses:
 *       200:
 *         description: Driver profile updated successfully.
 *       401:
 *         description: Unauthorized, JWT missing or invalid.
 *       505:
 *         description: Not implemented yet.
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
 * 
 * /api/driver/updateDriverProfilePhoto:
 *   put:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Update the driver's profile photo.
 *     description: Updates the profile photo of the authenticated driver.
 *     responses:
 *       200:
 *         description: Driver profile photo updated successfully.
 *       401:
 *         description: Unauthorized, JWT missing or invalid.
 *       505:
 *         description: Not implemented yet.
 *       420:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
* /api/driver/getAllAvailableOrders:
*   get:
*     tags:
*       - Driver (JWT required)
*     summary: Get all delivery orders.
*     description: Retrieves all orders available for delivery.
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Get all orders available.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Order'
*                 products:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Product'
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

* /api/driver/acceptOrder:
*   put:
*     tags:
*       - Driver (JWT required)
*     summary: Accept a delivery order.
*     description: Allows a driver to accept an order for delivery.
*     parameters:
*       - name: orderId
*         in: query
*         description: The ID of the order to accept.
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Order accepted successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Order accepted successfully"
*                 order:
*                   $ref: '#/components/schemas/Order'
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