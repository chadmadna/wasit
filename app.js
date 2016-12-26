var express = require('express')
var line = require('node-line-bot-api')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var parseCommand = require('./utils/parseCommand')
var displayScore = require('./utils/displayScore')

require('dotenv').config()

var app = express()

app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))
app.use(bodyParser.urlencoded({ extended: false }))

// connect to mongoose
mongoose.connect('mongodb://188.166.247.122/wasit')
mongoose.connection.on('error', console.error.bind(console, 'Connection Error:'))
mongoose.connection.on('open', function() {
  console.log('Successfully connected to MongoDB database.')
})

// initialize line
line.init({
  accessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
})

app.get('/', function (req, res, next) {
  res.send('It works!')
})

app.get('/webhook', function (req, res, next) {
  res.send('Success!')
})

app.post('/webhook', line.validator.validateSignature(), function(req, res, next) {
  console.log(req.body.events)
  var promises = req.body.events.map(event => {
    parseCommand(event.message.text, function (err, results) {
      if (err) {
        return line.client
          .replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: 'text',
                text: 'eh apesi'
              }
            ]
          })
      } else if (!err && results) {
        return line.client
          .replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: 'text',
                text: displayScore(results)
              }
            ]
          })
      }
    })
  })
  Promise
    .all(promises)
    .then(() => res.status(200))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
})

module.exports = app
