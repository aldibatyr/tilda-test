require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const bodyParser = require('body-parser')


const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.post('/test', jsonParser, (req, res) => {
  console.log(req.body)
  try {
    const data = JSON.stringify(req.body)
    res.send(data)
  } catch (error) {
    return error
  }
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app

