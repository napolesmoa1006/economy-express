const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')
const { validateAuth } = require('../validators/users')

router.post('/login', validateAuth, authController.login)

router.post('/register', validateAuth, authController.register)

module.exports = router
