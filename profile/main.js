let players

$(() => { onload() })
 
async function onload() {
  // get players
  players = await getPlayers()

  // see if token cookie
  let tokenCookie = getCookie('token')
  console.log(tokenCookie)
  if(tokenCookie != "") {
    let id = tokenCookie.split('-')[0]
    console.log(id)
    viewPlayer(id)
  }

  // see if player in params
  let params = window.location.search.substr(1)
  let playerParam = params.replace('player=', '')
  if(playerParam != "") viewPlayer(playerParam)

  // on search enter
  $('#search').on('keypress', (event) => {
    if(event.key == 'Enter') viewPlayer($('#search').val())
    else searchmodeON()
  })

}

function searchmodeOFF() {
  if($('#search').hasClass('searching') == false) return
  $('#search').removeClass('searching')
  $('#search').animate({'left': '1%', 'width': '350px'}, 300, () => {
    $('#profile').animate({'margin-top': '50px'}, 200)
    $('#profile').fadeIn(300)
  })
}

function searchmodeON() {
  if($('#search').hasClass('searching')) return
  $('#search').addClass('searching')
  let leftCalc = window.innerWidth/2 - 250
  $('#profile').animate({'margin-top': '150px'}, 200, () => {
    $('#search').animate({'left': leftCalc, 'width': '500px'}, 300)
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
  searchmodeOFF()
}

function searchPlayer(text) {
  let possibilities = []
  for(let playerID in players) {
    let player = players[playerID]
    if(player.username == text) return player
    if(player.id == text) return player
    let score = player.username.score(text)
    possibilities.push([player.id, score])
  }

  // sort possibilities
  possibilities.sort((a, b) => b[1]-a[1])

  let highestPossiblePlayer = players[possibilities[0][0]]
  return highestPossiblePlayer
}