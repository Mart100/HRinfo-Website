$(() => {
  $.getJSON('./data.json', (data) => {
    for(let weapon of data) addWeapon(weapon)
  })
})

function addWeapon(weapon) {
  let html = `
  <div class="weapon" id="weapon-${weapon.name}">
    <img src="${weapon.image}"/>
    <div class="bar">
      <div class="name">${weapon.name}</div>
    </div>
  </div>
  `
  $('#weapons').append(html)

  $(`#weapon-${weapon.name}`).on('mouseenter', () => {
    $(`#weapon-${weapon.name} .bar`).addClass("extended")
    $(`#weapon-${weapon.name} .bar`).append(`
    <span style="display: none;">magazine: ${weapon.magazine}</span><br>
    <span style="display: none;">damage: ${weapon.damage}</span><br>
    <span style="display: none;">color: <span style="color: ${weapon.color}">${weapon.color}</span></span><br>
    `)
    $(`#weapon-${weapon.name} span`).fadeIn(300)

  })

  $(`#weapon-${weapon.name}`).on('mouseleave', () => {
    $(`#weapon-${weapon.name} .bar`).removeClass("extended")
    $(`#weapon-${weapon.name} span`).fadeOut(300, () => {
      $(`#weapon-${weapon.name} .bar`).html(`<div class="name">${weapon.name}</div>`)
    })
  })
}