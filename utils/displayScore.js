module.exports = function(score) {
  console.log(score)
  var scoreStr = ''
  Object.keys(score).forEach(function(player, i) {
    scoreStr += `${player}: ${score[player]}`
  })
  return scoreStr.trim()
}