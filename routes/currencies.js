const express = require('express')
const router = express.Router()

const currenciesController = require('../controllers/currencies')
const { verifyJWT } = require('../middlewares/jwt-verify')
// const { validateUpdate } = require('../validators/currencies')

/**
 * @openapi
 * /currencies:
 *   get:
 *     tags:
 *       - Currencies
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
 *                     $ref: '#/components/schemas/Currency'
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
router.get('/', verifyJWT, currenciesController.getAll)

module.exports = router