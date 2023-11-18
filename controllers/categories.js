require('dotenv').config()
const { Op } = require('sequelize')

const { Category } = require('../models')

const getAll = async (req, res) => {
  const { id: uid } = req.body
  
  try {
    const data = await Category.findAll({
      where: {
        [Op.or]: {
          created_by: uid,
          is_default: true
        }
      },
      attributes: ['id', 'name', ['is_expense', 'isExpense'], ['created_at', 'createdAt']]
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
    const category = await Category.findByPk(id)

    if (category === null) {
      return res.status(404).json({ success: false, error: 'Category not found.' })
    }

    if (!category.isDefault && uid !== category.createdBy) {
      return res.status(400).json({ success: false, error: 'You don\'t have access to this resource.' })
    }

    const data = {
      id: category.id,
      name: category.name,
      isExpense: category.isExpense,
      createdAt: category.created_at
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

module.exports = { getAll, getById }
