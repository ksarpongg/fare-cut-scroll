mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  pitch: config.chapters[0].location.pitch || 0,
  bearing: config.chapters[0].location.bearing || 0
});

// Scrollama setup
const scroller = scrollama();

// Define marker variable globally
let accraMarker;

map.on('load', function () {
  // Add Ghana country border
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

  // Create blinking Greater Accra marker
  const accraWrapper = document.createElement('div');
  accraWrapper.className = 'marker-wrapper';

  const accraPulse = document.createElement('div');
  accraPulse.className = 'pulse-marker';

  accraWrapper.appendChild(accraPulse);

  // Place the marker at Greater Accra center
  accraMarker = new mapboxgl.Marker({
    element: accraWrapper,
    anchor: 'bottom'
  }).setLngLat([-0.22, 5.65]); // Adjust if needed
});

// Scroll-driven map fly-to
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

    // Show the blinking marker only on slide 2
    if (chapter.id === 'slide2' && accraMarker) {
      accraMarker.addTo(map);
    } else if (accraMarker) {
      accraMarker.remove();
    }
  });
