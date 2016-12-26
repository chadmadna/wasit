const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: { type: String, default: 'Kacung' },
  score: { type: Number, default: 0 }
})

playerSchema.statics.increment = function(player, number, cb) {
  this.update({ name: player }, { '$inc': { score: number } }, cb)
}

playerSchema.statics.score = function(cb) {
  this.find({}, cb)
}

const Player = mongoose.model('player', playerSchema)

module.exports = Player
