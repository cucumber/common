import path from 'path'
import express from 'express'

const webApp = engine => {
  const app = express()
  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.get('/', (req, res) => {
    res.end()
  })

  return app
}

export default webApp