let players

$(() => { onload() })
 
async function onload() {
  // get players
  players = await getPlayers()

  // see if player in params
  let params = window.location.search.substr(1)
  let playerParam = params.replace('player=', '')
  if(playerParam != undefined) viewPlayer(playerParam)

  // on search enter
  $('#search').on('keypress', (event) => {
    if(event.key == 'Enter') viewPlayer($('#search').val())
  })
}


function viewPlayer(text) {
  let player = searchPlayer(text)
  $('#search').val('')
  $('#search').blur()

  // assign data
  $('#top #username').html(player.username)


  $('#profile #bottom').html('')
  $('#profile #bottom').append('<br>')
  $('#profile #bottom').append(`<span>Clan: ${player.clan}</span><br>`)
  $('#profile #bottom').append(`<span>Points: ${player.points}</span><br>`)
  $('#profile #bottom').append(`<span>Division: ${player.division}</span><br>`)


  // appear
  $('#search').animate({'left': '1%', 'width': '350px'}, 500, () => {
    $('#profile').fadeIn(500)
  })
}

function searchPlayer(text) {
  for(let playerID in players) {
    let player = players[playerID]
    if(player.username == text) return player
    if(player.id == text) return player
  }
}