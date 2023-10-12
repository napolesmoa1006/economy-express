const jwt = require('jsonwebtoken')

const encode = async (user) => {
  try {
    const payload = {
      uid: user._id,
      userType: user.type
    }

    const authToken = await jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '4h' })

    return authToken
  } catch (error) {
    return error
  }
}

module.exports = { encode }
