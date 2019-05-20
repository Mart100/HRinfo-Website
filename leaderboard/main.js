$(() => {
  console.log('testo')
  $.get('https://hrinfo-api.herokuapp.com/players', (players) => {
    // sort players on points
    let sortedPlayers = Object.values(players).sort((a, b) => b.points-a.points)

    for(let i in sortedPlayers) addPlayer(sortedPlayers[i], i)
  })
})

function addPlayer(player, placement) {
  console.log(player)
  let html = `
  <div class="player">
    <span class="placement">#${placement}: </span>
    <span class="name">${player.username}</span>
    <span class="points">Points: ${player.points}</span>
  </div>
  `
  $('#players').append(html)
}