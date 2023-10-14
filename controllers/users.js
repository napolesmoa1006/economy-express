require('dotenv').config()

const { User } = require('../models')

const index = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ['password', 'updatedAt'] }
    })

    res.status(200).json({ message: 'Success', data })
  } catch (error) {
    res.status(500).json({ message: 'Failed', error })
  }
}

const getAll = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ['password', 'updatedAt'] }
    })

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const getById = async (req, res) => {
  const { id } = req.params

  if (isNaN(id))
    res.status(400).json({ success: false, error: 'User ID must be a number' })

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'updatedAt'] }
    })

    if (user === null)
      res.status(404).json({ success: false, error: 'User not found' })
    else
      res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

// TODO

// show (GET to '/users/:id')

// update (PUT to '/users/:id')

// destroy (DELETE to '/users/:id')

module.exports = { index, getAll, getById }
