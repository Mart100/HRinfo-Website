function addWeapon(weapon) {

  let rgbColor = rarityToRGB(weapon.color)


  let html = `
  <div class="weapon" id="weapon-${weapon.name}">
    <img src="${weapon.image}" style="background-color: rgba(${rgbColor.toString()}, 0.5)"/>
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
    <span style="display: none;">color: <span style="color: rgb(${rgbColor.toString()})">${weapon.color}</span></span><br>
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

function rarityToRGB(rarity) {
  let rgb = [0,0,0]

  if(rarity == 'common') rgb = [162,162,162]
  if(rarity == 'rare') rgb = [52,53,182]
  if(rarity == 'unique') rgb = [163,28,171]
  if(rarity == 'legendary') rgb = [204,139,25]

  return rgb
}