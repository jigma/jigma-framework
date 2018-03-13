const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const fs = require('fs')


const makeExpress = (config) => {
  const app = express()
  const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,Content-Type,Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    next()
  }
  app.use('*', (req, res, next) => {
    if (req.method == 'OPTIONS') {
      res.status(200)
      res.send()
    } else {
      next()
    }
  })
  app.use(allowCrossDomain)
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(bodyParser.urlencoded({ extended: true }))

  const serverConfig = config.https !== 'true' ? {} :
    {
      key: fs.readFileSync(config.https_privkey),
      cert: fs.readFileSync(config.https_cert),
      ca: fs.readFileSync(config.https_fullchain)
    }

  app.jigma = (port) => {
    const server = config.https !== 'true'
      ? require('http').createServer(app)
      : require('https').createServer(serverConfig, app)

    server.listen(port)
    console.log(`Listen on: ${port}`)
  }
  return app
}


export default makeExpress
