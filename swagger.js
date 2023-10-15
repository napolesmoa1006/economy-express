const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Economy Express API with Swagger',
      version: '0.1.0',
      description:
        'This is an API application made with Express and documented with Swagger.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Economy',
        url: 'https://www.linkedin.com/in/x3il-oq8/',
        email: 'napolesmoa1006@gmail.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`
      }
    ]
  },
  apis: ['./routes/*.js', './models/*.js']
}

module.exports = { options }
