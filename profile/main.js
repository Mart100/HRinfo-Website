let players
let viewingP

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

  viewingP = player
  $('#search').val('')
  $('#search').blur()

  // assign data
  $('#top #username').html(player.username)

  viewPlayerOverview()
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

async function viewPlayerStatistics() {
  // update nav
  $('#navP span').removeClass('selected')
  $('#navP #navStatistics').addClass('selected')
  $('#bottom').html('')
  
  let stats = await getPlayerCurrentStats(viewingP.gameID)

  console.log(stats)
  $('#bottom').append(`<span>Games Played: ${stats.totalGamesPlayed}</span><br>`)
  $('#bottom').append(`<span>Created At: ${stats.createdAt}</span><br>`)
  $('#bottom').append(`<span>Kills: ${stats.kills}</span><br>`)
  $('#bottom').append(`<span>Wins: ${stats.wins}</span><br>`)
  $('#bottom').append(`<span>Kills per game: ${stats.kills / stats.totalGamesPlayed}</span><br>`)
}

async function viewPlayerOverview() {
  let player = viewingP
  // update nav
  $('#navP span').removeClass('selected')
  $('#navP #navOverview').addClass('selected')
  $('#bottom').html('')

  // assign data
  $('#profile #bottom').html('')
  $('#profile #bottom').append('<br>')
  $('#profile #bottom').append(`<span>Clan: ${player.clan}</span><br>`)
  $('#profile #bottom').append(`<span>Points: ${player.points}</span><br>`)
  $('#profile #bottom').append(`<span>Division: ${player.division}</span><br>`)
}


async function viewPlayerImprovement() {
  // update nav
  $('#navP span').removeClass('selected')
  $('#navP #navImprovement').addClass('selected')
  $('#bottom').html('')

  let trackedStats = await getPlayerAllStats(viewingP.id)

  console.log(trackedStats)

  // refine data
  let KperGame = []
  let winLoseRate = []
  for(let day in trackedStats) {
    let stat = trackedStats[day]
    KperGame.push(stat.kills / stat.totalGamesPlayed)
    winLoseRate.push(stat.wins / stat.totalGamesPlayed * 100)
  }


  $('#bottom').append('<canvas id="myChart" width="500" height="220"></canvas>')
  let canvas = document.getElementById('myChart')
  let ctx = canvas.getContext('2d')

  let myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(trackedStats),
        datasets: [{
          label: 'Kills per game',
          backgroundColor: '#FF6565',
          borderColor: 'red',
          fill: false,
          data: KperGame
        },
        {
          label: 'Win Lose rate %',
          backgroundColor: '#69FF46',
          borderColor: 'green',
          fill: false,
          data: winLoseRate
        }]
      },
      options: {}
  })
}