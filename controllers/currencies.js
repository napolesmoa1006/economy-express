require('dotenv').config()
const { Op } = require('sequelize')

const { Currency } = require('../models')

const getAll = async (req, res) => {
  const { id: uid } = req.body
  
  try {
    const data = await Currency.findAll({
      where: {
        [Op.or]: {
          created_by: uid,
          is_default: true
        }
      },
      attributes: ['id', 'abbreviation', 'name', ['created_at', 'createdAt']]
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
      return res.status(404).json({ success: false, error: 'Currency not found.' })
    }

    if (uid !== currency.createdBy) {
      return res.status(400).json({ success: false, error: 'You don\'t have access to this resource.' })
    }

    const data = {
      id: currency.id,
      abbreviation: currency.abbreviation,
      name: currency.name,
      createdAt: currency.createdAt
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

module.exports = { getAll, getById }
