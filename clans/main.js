// on page load
$(() => {

  // read clans from database
  $.get('https://hrinfo-api.herokuapp.com/clans', (data) => { 
    let clans = data
    for(let i in clans) addClan(clans[i])
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
  <div class="clan" id="clan-${clan.name}">
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

  if(clan.invite == 'none') $(`#clan-${clan.name} .discord`).css('visibility', 'hidden')

}