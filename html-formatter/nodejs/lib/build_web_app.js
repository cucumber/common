const path = require('path')
const express = require('express')

const webApp = engine => {
  const app = express()
  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.get('/', (req, res) => {
    res.end()
  })

  return app
}

module.exports = webApp