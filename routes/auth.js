const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')
const { validateAuth } = require('../validators/users')

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: system
 *              password:
 *                type: string
 *                example: s3cur3p455w0rd
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */
router.post('/login', validateAuth, authController.login)

router.post('/register', validateAuth, authController.register)

module.exports = router
