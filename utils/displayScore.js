module.exports = function(score) {
  console.log(score)
  var scoreStr = ''
  Object.keys(score).forEach(function(playerObj, i) {
    var name = playerObj.name
    var score = playerObj.score
    scoreStr += name + ': ' + score.toString()
  })
  return scoreStr.trim()
}