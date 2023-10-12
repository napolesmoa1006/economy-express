const bcrypt = require('bcrypt')
const { User } = require('../models')

const index = async (req, res, next) => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ['password', 'updatedAt'] }
    })

    res.status(200).json({ message: 'Success', data })
  } catch (error) {
    res.status(500).json({ message: 'Failed', error })
  }
}

module.exports = { index }
