const jwt = require('jsonwebtoken')

const createJWT = async (user) => {
  try {
    const payload = {
      uid: user.id
    }

    const authToken = await jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '4h' })

    return authToken
  } catch (error) {
    return error
  }
}

module.exports = { createJWT }
