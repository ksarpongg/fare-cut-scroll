mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  pitch: config.chapters[0].location.pitch || 0,
  bearing: config.chapters[0].location.bearing || 0
});

// Add Ghana country border on map load
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
});

// Scrollama scroll setup
const scroller = scrollama();

// Create blinking Greater Accra marker (hidden by default)
const accraMarkerEl = document.createElement('div');
accraMarkerEl.className = 'pulse-marker';
const accraMarker = new mapboxgl.Marker(accraMarkerEl).setLngLat([-0.1870, 5.6037]);

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

    // Show Accra marker only on slide2
    if (chapter.id === 'slide2') {
      accraMarker.addTo(map);
    } else {
      accraMarker.remove();
    }
  });
