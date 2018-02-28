const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
}
app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(helmet())

export default app
