$(() => { load() })

let tournaments

async function load() {
  tournaments = await getTournaments()

  for(let id in tournaments) addTournament(tournaments[id])
}


function addTournament(tournament) {
  let html = `
  <div class="tournament" id="${tournament.id}">
    <span>Name: ${tournament.name}</span><br>
    <span>Host: ${tournament.host}</span><br>
    <span>Contesters: ${tournament.players.length}</span><br>
    <span>Status: ${tournament.status}</span><br>
  </div>
  `

  $('#tournaments').append(html)
}