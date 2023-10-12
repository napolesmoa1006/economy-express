const jwt = require('jsonwebtoken')

const decode = (req, res, next) => {
  if (!req.headers.authorization) { return res.status(400).json({ success: false, error: 'No access token provided' }) }

  const accessToken = req.headers.authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET_TOKEN)
    req.id = decoded.uid
    return next()
  } catch (error) {
    return res.status(401).json({ success: false, error })
  }
}

module.exports = { decode }
