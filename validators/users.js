const bcrypt = require('bcrypt')
const { check, param, validationResult } = require('express-validator')

const { User } = require('../models')

const validateGetById = [
  param('id')
    .exists()
    .isInt()
    .withMessage('User ID must be a number.'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      res.status(403).json({ success: false, error: error.array() })
    }
  }
]

const validateUpdate = [
  param('id')
    .exists()
    .isInt()
    .withMessage('User ID must be a number.'),
  check('password')
    .exists()
    .trim()
    .notEmpty()
    .withMessage('The password is required')
    .custom(async (value, { req }) => {
      const { id } = req.params
      const user = await User.findByPk(id)

      if (user === null) {
        throw new Error('User not found')
      }

      const valid = user && bcrypt.compareSync(value, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      return true
    }),
  check('confirmPassword')
    .custom((value, { req }) => {
      const { newPassword } = req.body

      if (value !== newPassword) {
        throw new Error('Your password and confirmation password do not match')
      }

      return true
    }),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      res.status(403).json({ success: false, error: error.array() })
    }
  }
]

module.exports = { validateUpdate, validateGetById }
