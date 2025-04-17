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
 *
 * /api/driver/restDriverPassword:
 *   post:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Reset driver's password.
 *     description: Resets the password for the authenticated driver.
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       401:
 *         description: Unauthorized, JWT missing or invalid.
 *       505:
 *         description: Not implemented yet.
 *
 * /api/driver/getAllOrders:
 *   get:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Get all delivery orders.
 *     description: Retrieves all orders available for delivery.
 *     responses:
 *       200:
 *         description: List of delivery orders.
 *       401:
 *         description: Unauthorized, JWT missing or invalid.
 *       505:
 *         description: Not implemented yet.
 *
 * /api/driver/acceptOrder:
 *   put:
 *     tags:
 *       - Driver (JWT required)
 *     summary: Accept a delivery order.
 *     description: Allows a driver to accept an order for delivery.
 *     responses:
 *       200:
 *         description: Order accepted successfully.
 *       401:
 *         description: Unauthorized, JWT missing or invalid.
 *       505:
 *         description: Not implemented yet.
 */
