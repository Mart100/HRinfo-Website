function getClans() {
  return new Promise((resolve, reject) => {
    $.get('https://hrinfo-api.herokuapp.com/clans', (data) => { resolve(data) })
  })
}

function getPlayers() {
  return new Promise((resolve, reject) => {
    $.get('https://hrinfo-api.herokuapp.com/players', (data) => { resolve(data) })
  })
}

function getDivisions() {
  return new Promise((resolve, reject) => {
    $.get('https://hrinfo-api.herokuapp.com/divisions', (data) => { resolve(data) })
  })
}