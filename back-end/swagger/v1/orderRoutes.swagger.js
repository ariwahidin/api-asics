/**
 * @swagger
 * /order/allDelivery:
 *   get:
 *     summary: Retrieve a list of delivery
 *     tags:
 *       - Delivery Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of delivery
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_no:
 *                     type: string
 *                   truck_no:
 *                     type: string
 *                   driver_name:
 *                     type: string
 *                   order_status:
 *                     type: string
 *                   document_list:
 *                     type: string
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /order/delivery:
 *   get:
 *     summary: Retrieve delivery by order number
 *     tags: 
 *       - Delivery Order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: orderNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The order number to retrieve details for
 *     responses:
 *       '200':
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 product:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 price:
 *                   type: number
 *                   format: float
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

