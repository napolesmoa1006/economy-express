const express = require('express')
const router = express.Router()

const currenciesController = require('../controllers/currencies')
const { verifyJWT } = require('../middlewares/jwt-verify')
const { validateGetById } = require('../validators/currencies')

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

/**
 * @openapi
 * /currencies/{id}:
 *   get:
 *     tags:
 *       - Currencies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 37
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Currency'
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
router.get('/:id', verifyJWT, validateGetById, currenciesController.getById)

module.exports = router
