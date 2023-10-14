const bcrypt = require('bcrypt')

const { User } = require('../models')
const { createJWT } = require('../helpers/jwt-create')

const login = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ 
    where: { username }
  })

  const valid = user && bcrypt.compareSync(password, user.password)

  if (valid) {
    const authToken = await createJWT(user)

    const data = {
      user: {
        id: user.id,
        username: user.username,
        nick: user.nick,
        createdAt: user.createdAt
      },
      authToken
    }

    res.status(200).json({ success: true, data })
  }
  else
    res.status(400).json({ success: false, error: 'Incorrect username or password' })
}

const register = async (req, res) => {
  let { username, password } = req.body

  try {
    password = bcrypt.hashSync(password, 10)
    const obj = User.build({ username, password, active: true })
    const user = await obj.save()
    const authToken = await createJWT(user)

    const data = {
      user: {
        id: user.id,
        username: user.username,
        nick: user.nick,
        createdAt: user.createdAt
      },
      authToken
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error: error.errors })
  }
}

module.exports = { login, register }
