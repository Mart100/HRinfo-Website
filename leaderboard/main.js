let divisions

$(() => {
  // get divisions
  $.get('https://hrinfo-api.herokuapp.com/divisions', (data) => { 
    divisions = data 
    
    // get players
    $.get('https://hrinfo-api.herokuapp.com/players', (players) => {
      // sort players on points
      let sortedPlayers = Object.values(players).sort((a, b) => b.points-a.points)

      for(let i in sortedPlayers) addPlayer(sortedPlayers[i], Number(i)+1)
    })
  })
})

function addPlayer(player, placement) {
  let html = `
  <div class="player" id="${player.id}">
    <span class="placement">#${placement}: </span>
    <span class="name">${player.username}</span>
    <span class="points">Points: ${player.points}</span>
    <span class="clan">Clan: ${player.clan}</span>
    <span class="division">Division:</span><img class="divisionIMG" src="${divisions[player.division].image}" />
  </div>
  `
  $('#players').append(html)

  if(placement == 1) $(`#${player.id}`).addClass('first')
  if(placement == 2) $(`#${player.id}`).addClass('second')
  if(placement == 3) $(`#${player.id}`).addClass('third')
}