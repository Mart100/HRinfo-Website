let clans
let clan
let players
let divisions

// on page load
$(() => {
  
  let params = window.location.search.substr(1)
  let clanParam = params.replace('clan=', '')



  // read clans from database
  $.get('https://hrinfo-api.herokuapp.com/clans', (data) => { 
    clans = data
    for(let i in clans) addClan(clans[i])
    if(clanParam != '') showClanFull(clanParam)
  })

  let text = `
  <span style="position: relative; top: 25px;">
    To have your own clan added here,<br> Invite this discord bot to your clan discord server!<br>
    <a href="https://discordapp.com/oauth2/authorize?client_id=578905640181825556&permissions=67585&scope=bot">Bot invite</a>
  </span>
  `
  $('#clans').append(`<div style="color: white; text-align: center;" class="clan">${text}</div>`)
})


function addClan(clan) {
  let html = `
  <div class="clan" id="clan-${clan.id}">
    <img src="${clan.image}"/>
    <span class="name">${clan.name}</span>
    <span class="desc">${clan.desc}</span>
    <a class="discord" href="https://discord.gg/${clan.invite}"><img src="https://i.imgur.com/2lEoaBb.png"/></a>
    <span class="memberCount">Members: ${clan.memberCount}</span>
    <span class="tag">Tag: ${clan.tag}</span>
    <span class="points">Points: ${clan.points}</span>
  </div>
  `
  $('#clans').append(html)

  $(`#clan-${clan.id}`).on('click', () => {
    window.location += `?clan=${clan.id}`
  })

  if(clan.invite == 'none') $(`#clan-${clan.name} .discord`).css('visibility', 'hidden')

}

//
function showClanFull(clanID) {
  clan = clans[clanID]
  let html = `
    <div id="profile">
      <div id="top">
        <img id="image" src="${clan.image}" />
        <div id="name">${clan.name}</div>
        <div id="joinclan">Join clan</div>
      </div>
      <div id="navC">
        <span class="overview" onclick="showOverview()">Overview</span>
        <span class="members" onclick="showMembers()" >Members</span>
      </div>
      <div id="bottom">

      </div>
    </div>
  `
  $('#clans').remove()
  $('body').append(html)
  showOverview()

  $('#joinclan').on('click', () => {
    let token = getCookie('token')
    let id = token.split('-')[0]
    token = token.split('-')[1]
    console.log(token, id)
    if(token == '') window.location.href = '../login'
    else {
      leaveClan(id, token)
      setTimeout(() => {
        $.ajax({
          contentType: 'application/json',
          data: JSON.stringify({ "id": id, "what": "clan", "to": clan.name, "token": token }),
          type: 'POST',
          url: 'https://hrinfo-api.herokuapp.com/updateplayer'
        })
        location.reload()
      }, 1000)
    }
  })

}
function showMembers() {

  // if players undefined
  if(players == undefined) {
    $.get('https://hrinfo-api.herokuapp.com/players', (data) => { 
      players = data
      showMembers()
    })
    return
  }

  // if divisions undefined
  if(divisions == undefined) {
    $.get('https://hrinfo-api.herokuapp.com/divisions', (data) => { 
      divisions = data
      showMembers()
    })
    return
  }


  $('#navC span').removeClass('selected')
  $('#navC .members').addClass('selected')
  $('#bottom').html('')
  $('#bottom').append('')

  // add players

  let sortedPlayers = Object.values(players).sort((a, b) => b.points-a.points)
  let filteredPlayers = sortedPlayers.filter((p) => p.clan == clan.name )

  for(let i in filteredPlayers) {
    let player = filteredPlayers[i]
    let html = `
    <div class="player" id="${player.id}">
      <span class="placement">#${Number(i)+1}: </span>
      <span class="name">${player.username}</span>
      <span class="points">Points: ${player.points}</span>
      <span class="division">Division:</span><img class="divisionIMG" src="${divisions[player.division].image}" />
    </div>
    `
    $('#bottom').append(html)
  }
}

function showOverview() {
  $('#navC span').removeClass('selected')
  $('#navC .overview').addClass('selected')
  $('#bottom').html('')
  $('#bottom').append(`<br>`)
  $('#bottom').append(`<span>Points: ${clan.points}</span><br>`)
  $('#bottom').append(`<span>Discord members: ${clan.discordMemberCount}</span><br>`)
  $('#bottom').append(`<span>Members: ${clan.members.length}</span>`)
}

function leaveClan(id, token) {
  $.ajax({
    contentType: 'application/json',
    data: JSON.stringify({ "id": id, "what": "clan", "to": "none", "token": token }),
    type: 'POST',
    url: 'https://hrinfo-api.herokuapp.com/updateplayer'
  })
}