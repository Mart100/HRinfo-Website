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

  $('#clans').append(`<div style="color: white; text-align: center;" class="clan"><span style="position: relative; top: 25px;">To have your own clan added here, Invite this discord bot to you clan discord server!<br><a href="https://discordapp.com/oauth2/authorize?client_id=578905640181825556&permissions=67585&scope=bot">Bot invite</a></span></div>`)
})


function addClan(clan) {
  let html = `
  <div class="clan" id="clan-${clan.name}">
    <img src="${clan.image}"/>
    <div class="name">${clan.name}</div>
    <div class="desc">${clan.desc}</div>
    <a class="discord" href="https://discord.gg/${clan.invite}"><img src="https://i.imgur.com/2lEoaBb.png"/></a>
    <div class="memberCount">Members: ${clan.memberCount}</div>
  </div>
  `
  $('#clans').append(html)

}