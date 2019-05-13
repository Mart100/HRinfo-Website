$(() => {
  $.getJSON('./clans.json', (data) => {
    for(let clan of data) addClan(clan)

    $('#clans').append(`<div style="color: white;" class="clan">DM me on discord (Marto_0#1978) to have your own clan added here!</div>`)
  })
})

function addClan(clan) {
  let html = `
  <div class="clan" id="clan-${clan.name}">
    <img src="${clan.image}"/>
    <div class="name">${clan.name}</div>
    <div class="desc">${clan.desc}</div>
    <a class="discord" href="${clan.discord}"><img src="https://i.imgur.com/2lEoaBb.png"/></a>
  </div>
  `
  $('#clans').append(html)

}