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
    setTimeout(() => {
      $(`#weapon-${weapon.name} .bar`).append(`magazine: ${weapon.magazine}`)
    }, 300)
  })

  $(`#weapon-${weapon.name}`).on('mouseleave', () => {
    $(`#weapon-${weapon.name} .bar`).removeClass("extended")
		$(`#weapon-${weapon.name} .bar`).html(`<div class="name">${weapon.name}</div>`)
  })
}