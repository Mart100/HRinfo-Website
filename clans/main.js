let firestore = firebase.firestore()

// on page load
$(() => {

  // read clans from database
  firestore.collection("clans").get().then((querySnapshot) => {
    let clans = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      clans.push(data)
    })

    for(let clan of clans) addClan(clan)
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
    <span class="tag">TAG: ${clan.tag}</span>
  </div>
  `
  $('#clans').append(html)

  if(clan.invite == 'none') $(`#clan-${clan.name} .discord`).css('visibility', 'hidden')

}