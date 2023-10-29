const bcrypt = require('bcrypt')

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
      attributes: { exclude: ['password', 'active', 'updatedAt'] }
    })

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const getById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'active', 'updatedAt'] }
    })

    if (user === null) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { id: uid, nick, newPassword } = req.body

  if (id !=  uid) {
    return res.status(400).json({ success: false, error: 'You can only modify your own user' })
  }

  try {
    const user = await User.findByPk(uid)
    user.nick = nick
    user.updatedAt = new Date()

    if (newPassword.trim() !== '') {
      user.password = bcrypt.hashSync(newPassword, 10)
    }

    await user.save()

    const data = {
      id: user.id,
      username: user.username,
      nick: user.nick,
      createdAt: user.createdAt
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

// TODO

// show (GET to '/users/:id')

// destroy (DELETE to '/users/:id')

module.exports = { index, getAll, getById, update }
