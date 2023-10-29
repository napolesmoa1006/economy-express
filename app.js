require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const { options } = require('./swagger')
const specs = swaggerJsDoc(options)

// Routes
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const categoriesRouter = require('./routes/categories')
const currenciesRouter = require('./routes/currencies')
const usersRouter = require('./routes/users')

const app = express()

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

// Use Helmet!
app.use(helmet({
  contentSecurityPolicy: false,
  xDownloadOptions: false,
  xFrameOptions: { action: 'deny' },
  xPoweredBy: false,
  xXssProtection: false
}))

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/categories', categoriesRouter)
app.use('/currencies', currenciesRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ success: false, error: 'Resource not found.' })
  next()
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ success: false, error: 'Something bad happened.' })
})

module.exports = app
