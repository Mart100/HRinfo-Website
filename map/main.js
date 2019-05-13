let map

$(() => {

  map = L.map('map', {
    minZoom: 1,
    maxZoom: 10,
    center: [-200, 200],
    zoom: 1,
    crs: L.CRS.Simple
  })

  let southWest = map.unproject([0, 800], 1)
  let northEast = map.unproject([800, 0], 1)
  let bounds = new L.LatLngBounds(southWest, northEast)


  L.imageOverlay('map.jpg', bounds).addTo(map)


})