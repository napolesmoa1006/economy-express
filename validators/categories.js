const { param, validationResult } = require('express-validator')

const validateGetById = [
  param('id')
    .exists()
    .isInt()
    .withMessage('Category ID must be a number.'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      res.status(403).json({ success: false, error: error.array() })
    }
  }
]

module.exports = { validateGetById }
