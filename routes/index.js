const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    erros: []
  })
})

router.get('/register', (req, res) => {
  res.render('auth/register', {
    title: 'Register',
    erros: []
  })
})

module.exports = router
