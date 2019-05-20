$(() => {
  $.get('https://hrinfo-api.herokuapp.com/players', (players) => {
    // sort players on points
    let sortedPlayers = Object.values(players).sort((a, b) => b.points-a.points)

    for(let i in sortedPlayers) addPlayer(sortedPlayers[i], i)
  })
})

function addPlayer(player, placement) {
  let html = `
  <div class="player">
    <span class="placement">#${placement+1}: </span>
    <span class="name">${player.username}</span>
    <span class="points">Points: ${player.points}</span>
  </div>
  `
  $('#players').append(html)
}