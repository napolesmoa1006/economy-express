const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')
const { verifyJWT } = require('../middlewares/jwt-verify')
const { validateUpdate } = require('../validators/users')

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: No access token provided
 */
router.get('/', verifyJWT, usersController.getAll)

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: jwt expired
 *       403:
 *         description: Fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: No access token provided
 */
router.get('/:id', verifyJWT, usersController.getById)

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: s3cur3p455w0rd
 *               newPassword:
 *                 type: string
 *                 example: n3wS3cur3p455w0rd
 *               confirmPassword:
 *                 type: string
 *                 example: c0nf1rmS3cur3p455w0rd
 *               nick:
 *                 type: string
 *                 example: SysUser
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: jwt expired
 *       403:
 *         description: Fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: No access token provided
 */
router.put('/:id', verifyJWT, validateUpdate, usersController.update)

module.exports = router
