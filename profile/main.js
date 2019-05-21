$(() => {
  let discordID = getCookie('discord')

  if(discordID == "") loginDiscord()
})


function loginDiscord() {
  let link = 'https://discordapp.com/api/oauth2/authorize?client_id=578905640181825556&redirect_uri=https%3A%2F%2Fhrinfo.xyz%2Fprofile&response_type=code&scope=identify'
  let html = `
  <a href="${link}" style="text-decoration: none;"><div id="login">Log in with discord</div></a>
  `
  $('#profile').html(html)

  // if joined with params
  let params = window.location.search.substr(1)
  if(params != '') {
    let code = params.replace('code=', '')
    const fragment = new URLSearchParams(window.location.hash.slice(1))
    console.log(fragment)
    if(fragment.has("access_token")) {
      const accessToken = fragment.get("access_token");
      const tokenType = fragment.get("token_type");

      fetch('https://discordapp.com/api/users/@me', {
        headers: {
          authorization: `${tokenType} ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(response => {
          const { username, discriminator } = response;
          console.log(`${username}#${discriminator}`)
        })
        .catch(console.error);

    }
  }
}  