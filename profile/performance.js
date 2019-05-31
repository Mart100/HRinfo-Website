let trackedStats

async function viewPlayerPerformance() {
  // update nav
  $('#navP span').removeClass('selected')
  $('#navP #navPerformance').addClass('selected')
  $('#bottom').html('')

  trackedStats = await getPlayerAllStats(viewingP.id)

  if(Object.keys(trackedStats).length == 0) return gameNotConnected()
  console.log(trackedStats, Object.keys(trackedStats).length)

  // refine data
  let KperGame = []
  let winLoseRate = []
  for(let day in trackedStats) {
    let stat = trackedStats[day]
    KperGame.push(stat.kills / stat.totalGamesPlayed)
    winLoseRate.push(stat.wins / stat.totalGamesPlayed * 100)
  }


  $('#bottom').append('<div style="width: 850px; height: 460px;"><canvas id="myChart" width="500" height="265"></canvas></div>')
  $('#bottom').css('display', 'flex')
  let canvas = document.getElementById('myChart')
  ctx = canvas.getContext('2d')

  // create sidenav
  let sidenavHTML = `
  <div id="sidenav">
    <span class="selected" id="KPG" onclick="killsPerGameGraph()">Kills per game</span>
    <span class=""         id="WR"  onclick="winRateGraph()">     Win rate %    </span>
  </div>
  `
  $('#bottom').prepend(sidenavHTML)

  killsPerGameGraph()
}

async function killsPerGameGraph() {

  $('#sidenav span').removeClass('selected')
  $('#sidenav #KPG').addClass('selected')

  // refine data
  let KperGame = []
  for(let day in trackedStats) {
    let stat = trackedStats[day]
    KperGame.push(stat.kills / stat.totalGamesPlayed)
  }

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
      }]
    },
    options: {}
  })
}

async function winRateGraph() {

  $('#sidenav span').removeClass('selected')
  $('#sidenav #WG').addClass('selected')

  // refine data
  let winLoseRate = []
  for(let day in trackedStats) {
    let stat = trackedStats[day]
    winLoseRate.push(stat.wins / stat.totalGamesPlayed * 100)
  }

  let myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(trackedStats),
      datasets: [{
        label: 'Win rate %',
        backgroundColor: '#69FF46',
        borderColor: 'green',
        fill: false,
        data: winLoseRate
      }]
    },
    options: {}
  })
}