const { check, validationResult } = require('express-validator')

const validateAuth = [
  check('username')
    .exists()
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('The username must be more than 6 characters.'),
  check('password')
    .exists()
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('The password must be more than 6 characters.'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      res.status(403).json({ success: false, error: error.array() })
    }
  }
]

module.exports = { validateAuth }
