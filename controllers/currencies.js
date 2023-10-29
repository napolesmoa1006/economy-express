require('dotenv').config()

const { User } = require('../models')
const { Currency } = require('../models')

const getAll = async (req, res) => {
  const { uid } = req.body

  try {
    const sysUser = await User.findOne({ where: { username: process.env.DEFAULT_USER_USERNAME } })
    const data = await Currency.findAll({
      where: {
        created_by: [sysUser.id, uid]
      },
      attributes: ['id', 'abbreviation', 'name', 'created_at']
    })

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const getById = async (req, res) => {
  const { id } = req.params
  const { id: uid } = req.body

  try {
    const currency = Currency.findByPk(id)

    if (currency === null) {
      return res.status(404).json({ success: false, error: 'Currency not found' })
    }

    if (uid !== currency.created_by) {
      return res.status(400).json({ success: false, error: 'You don\'t have access to this resource.' })
    }

    const data = {
      id: currency.id,
      abbreviation: currency.abbreviation,
      name: currency.name,
      created_at: currency.created_at
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

module.exports = { getAll, getById }
