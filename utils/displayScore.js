module.exports = function(score) {
  var scoreStr = ''
  score.forEach(function(playerObj) {
    console.log({ playerObj, score: playerObj.score })
    var name = playerObj.name
    var score = playerObj.score
    scoreStr += name + ': ' + score
  })
  return scoreStr.trim()
}