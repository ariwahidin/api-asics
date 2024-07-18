/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in to get an access token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: string
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out to end the session
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       '200':
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Extending the active period of access tokens
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       '200':
 *         description: newAccessToken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal Server Error
 */
