let players

$(() => {
  // get players
  $.get('https://hrinfo-api.herokuapp.com/players', (data) => { players = data })

  // on search enter
  $('#search').on('keypress', (event) => {
    if(event.key == 'Enter') {
      let text = $('#search').val()
      let player = searchPlayer(text)
      $('#search').val('')
      console.log(player)

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
  })
})



function searchPlayer(text) {
  for(let playerID in players) {
    let player = players[playerID]
    if(player.username == text) return player
    if(player.id == text) return player
  }
}