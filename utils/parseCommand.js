var Player = require('../models/player')

module.exports = function(text, cb) {
  var textArray = text.trim().split(' ')
  var command = textArray[0]
  var args = textArray.slice(1)
  
  if (command !== '/wasit') {
    // Incorrect call
    cb(new Error('ParseError'))
  } else {
    // View score
    if (args[0] === 'score') {
      Player.score(function (err, docs) {
        if (err) {
          cb(err)
        } else {
          cb(null, docs)
        }
      })
    // Increment or decrement score
    } else if (args[0].match(/\w/) && args[1].match(/((\+|-)\d)|\d/)) {
      var name = args[0]
      var value = args[1]
      Player.increment(name, value, function (err, raw) {
        if (err) {
          cb(err)
        } else {
          Player.score(function (err, docs) {
            if (err) {
              cb(err)
            } else {
              cb(null, docs)
            }
          })
        }
      })
    // Add or delete players
    } else if (args[0].match(/(add)|(delete)/) && args[1].match(/\w/)) {
      var command = args[0]
      var name = args[1]
      if (command === 'add') {
        var player = new Player({ name })
        player.save(function(err, product, numAffected) {
          if (!err) {
            cb(null, null)
          } else {
            cb(err)
          }
        })
      } else if (command === 'delete') {
        Player.remove({ name }, function (err) {
          if (!err) {
            cb(null, null)
          } else {
            cb(err)
          }
        })
      } else {
        cb(new Error('ParseError'))
      }
    // Invalid syntax on correct call
    } else {
      cb(new Error('ParseError'))
    }
  }
}