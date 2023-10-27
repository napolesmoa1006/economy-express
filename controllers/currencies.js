require('dotenv').config()

const { User } = require('../models')
const { Currency } = require('../models')

const getAll = async (req, res) => {
  const { id } = req.body

  try {
    const sysUser = await User.findOne({ where: { username: process.env.DEFAULT_USER_USERNAME } })
    const data = await Currency.findAll({
      where: {
        created_by: [sysUser.id, id]
      },
      attributes: ['id', 'abbreviation', 'name', 'created_at']
    })

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

module.exports = { getAll }
