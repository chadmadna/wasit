var mongoose = require('mongoose')
var Schema = mongoose.Schema

var playerSchema = new Schema({
  name: { type: String, default: 'Kacung' },
  score: { type: Number, default: 0 }
})

playerSchema.statics.increment = function(player, number, cb) {
  this.update({ name: player }, { '$inc': { score: number } }, cb)
}

playerSchema.statics.score = function(cb) {
  this.find({}, cb)
}

var Player = mongoose.model('player', playerSchema)

module.exports = Player
