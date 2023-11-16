const express = require('express')
const router = express.Router()

const currencyUserController = require('../controllers/currency-user')
const { verifyJWT } = require('../middlewares/jwt-verify')

/**
 * @openapi
 * /currency-user/{id}:
 *   post:
 *     tags:
 *       - CurrencyUser
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
 *               $ref: '#/components/schemas/CurrencyUser'
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
router.post('/:id', verifyJWT, currencyUserController.create)

module.exports = router
