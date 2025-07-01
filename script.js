mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  pitch: config.chapters[0].location.pitch || 0,
  bearing: config.chapters[0].location.bearing || 0
});

// Add Ghana border outline on map load
map.on('load', function () {
  // === Ghana border outline ===
  map.addSource('ghana-border', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries/GHA.geo.json'
  });

  map.addLayer({
    id: 'ghana-outline',
    type: 'line',
    source: 'ghana-border',
    paint: {
      'line-color': '#ffffff',
      'line-width': 2
    }
  });

  // === Create blinking marker for Greater Accra ===
  const accraMarkerEl = document.createElement('div');
  accraMarkerEl.className = 'pulse-marker';

  // Fix: Add marker with offset to avoid top-left bug
  window.accraMarker = new mapboxgl.Marker({
    element: accraMarkerEl,
    offset: [0, 0]
  }).setLngLat([-0.22, 5.65]); // Coordinates of Greater Accra
});

// === Add static bus stop labels ===
const busStops = [
  { name: 'Kasoa', coords: [-0.423756, 5.534052] },
  { name: 'Old Barrier', coords: [-0.329034, 5.551157] },
  { name: 'Mallam', coords: [-0.286262, 5.569050] },
  { name: 'Kaneshie', coords: [-0.237506, 5.566120] },
  { name: 'Circle', coords: [-0.216840, 5.569132] }
];

busStops.forEach(stop => {
  const stopEl = document.createElement('div');
  stopEl.className = 'stop-marker';
  stopEl.innerText = stop.name;
  new mapboxgl.Marker(stopEl).setLngLat(stop.coords).addTo(map);
});

// === Scrollama Scroll Logic ===
const scroller = scrollama();
