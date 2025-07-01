mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  pitch: config.chapters[0].location.pitch || 0,
  bearing: config.chapters[0].location.bearing || 0
});

// === Ghana outline ===
map.on('load', function () {
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

  // === Add Greater Accra blinking marker here ===
  const accraMarkerEl = document.createElement('div');
  accraMarkerEl.className = 'pulse-marker';

  // Make sure marker is created inside .on('load') and added *only* when needed
  window.accraMarker = new mapboxgl.Marker(accraMarkerEl)
    .setLngLat([-0.22, 5.65]); // Adjust if needed

  // === Static labels for bus stops ===
  const stops = [
    { name: 'Kasoa', coords: [-0.423756, 5.534052] },
    { name: 'Old Barrier', coords: [-0.329034, 5.551157] },
    { name: 'Mallam', coords: [-0.286262, 5.569050] },
    { name: 'Kaneshie', coords: [-0.237506, 5.566120] },
    { name: 'Circle', coords: [-0.216840, 5.569132] }
  ];

  stops.forEach(stop => {
    const el = document.createElement('div');
    el.className = 'stop-marker';
    el.innerText = stop.name;
    new mapboxgl.Marker(el).setLngLat(stop.coords).addTo(map);
  });
});

// === Scrollama ===
const scroller = scrollama();

scroller
  .setup({
    step: ".step",
    offset: 0.5,
    debug: false
  })
  .onStepEnter(response => {
    const chapter = config.chapters.find(chap => chap.id === response.element.id);
    if (chapter && chapter.location) {
      map.flyTo({
        center: chapter.location.center,
        zoom: chapter.location.zoom,
        pitch: chapter.location.pitch || 0,
        bearing: chapter.location.bearing || 0,
        speed: 0.8,
        essential: true
      });
    }

    // Show blinking marker only in Slide 2
    if (chapter.id === 'slide2' && window.accraMarker) {
      window.accraMarker.addTo(map);
    } else if (window.accraMarker) {
      window.accraMarker.remove();
    }
  });
