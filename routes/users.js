const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')
const { verifyJWT } = require('../middlewares/jwt-verify')

/* GET users listing. */
router.get('/', verifyJWT, usersController.getAll)

router.get('/:id', verifyJWT, usersController.getById)

module.exports = router
