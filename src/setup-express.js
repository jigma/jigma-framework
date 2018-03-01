const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'x-access-token,Content-Type,Accept')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  next()
}
app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))

export default app
