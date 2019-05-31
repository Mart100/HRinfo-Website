let playingCount
let ctx

$(() => { load() })

async function load() {

  // select All Time
  $('#AT').addClass('selected')

  // get ctx
  let canvas = document.getElementById('graph')
  ctx = canvas.getContext('2d')

  // on sidenav click
  $('#sidenav span').on('click', (event) => {
    $('#sidenav span').removeClass('selected')
    $(event.target).addClass('selected')
    if(event.target.id == 'LH') LHgraph()
    if(event.target.id == 'LD') LDgraph()
    if(event.target.id == 'LW') LDgraph()
    if(event.target.id == 'LM') LDgraph()
    if(event.target.id == 'LY') LDgraph()
    if(event.target.id == 'AT') ATgraph()
  })

  playingCount = await getPlayingCount()
  ATgraph()
}

function LHgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps)
}
function LDgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6*24)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps)
}
function LWgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6*24*7)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps)
}
function LMgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6*24*7*31)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps)
}
function LYgraph() {
  let cuttedPlayingCount = Object.values(playingCount).slice(-6*24*7*31*12)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps)
}
function ATgraph() {
  let cuttedPlayingCount = Object.values(playingCount)
  let refined = refineData(cuttedPlayingCount)
  createGraph(refined.data, refined.timeStamps)
}

function refineData(unrefinedData) {
  let data = {asia: [], eu: [], us: [], sa: []}
  let timeStamps = []
  for(let hm of unrefinedData) {
    data.eu.push(hm.eu)
    data.us.push(hm.us)
    data.sa.push(hm.sa)
    data.asia.push(hm.asia)
    timeStamps.push(hm.recordedAt)
  }
  return {data: data, timeStamps: timeStamps}
}

function createGraph(data, labels) {
  let myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Asia',
        backgroundColor: 'green',
        borderColor: 'green',
        fill: false,
        data: data.asia
      },
      {
        label: 'Europe',
        backgroundColor: 'blue',
        borderColor: 'blue',
        fill: false,
        data: data.eu
      },
      {
        label: 'America',
        backgroundColor: 'red',
        borderColor: 'red',
        fill: false,
        data: data.us
      },
      {
        label: 'South-america',
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        fill: false,
        data: data.sa
      }]
    },
    options: {}
  })
}