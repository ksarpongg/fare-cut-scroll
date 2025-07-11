// === Updated script.js ===
mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  pitch: config.chapters[0].location.pitch || 0,
  bearing: config.chapters[0].location.bearing || 0
});

const scroller = scrollama();
let accraMarker;
const busStopMarkers = [];
let arrowMarker;

map.on('load', function () {
  // Ghana outline
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

  // Fare route line
  map.addSource('fare-route', {
    type: 'geojson',
    data: 'fare-route.json'
  });

  map.addLayer({
    id: 'fare-route-line',
    type: 'line',
    source: 'fare-route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#ffffff',
      'line-width': 4,
      'line-opacity': 0
    }
  });

  // Blinking Greater Accra Marker
  const accraWrapper = document.createElement('div');
  accraWrapper.className = 'marker-wrapper';

  const accraPulse = document.createElement('div');
  accraPulse.className = 'pulse-marker';

  accraWrapper.appendChild(accraPulse);

  accraMarker = new mapboxgl.Marker({
    element: accraWrapper,
    anchor: 'bottom'
  }).setLngLat([-0.22, 5.65]);

  // Bus stop markers
  const stops = [
    { name: 'Kasoa', coords: [-0.424939, 5.534267] },
    { name: 'Old Barrier', coords: [-0.329034, 5.551157] },
    { name: 'Mallam', coords: [-0.286262, 5.569050] },
    { name: 'Kaneshie', coords: [-0.237506, 5.566120] },
    { name: 'Circle', coords: [-0.216840, 5.569132] }
  ];

  stops.forEach(stop => {
    const el = document.createElement('div');
    el.className = 'stop-marker';
    el.innerText = stop.name;

    const marker = new mapboxgl.Marker(el).setLngLat(stop.coords);
    busStopMarkers.push(marker);
  });

  // === Arrow marker (initially hidden) ===
  const arrowImg = document.createElement('img');
  arrowImg.src = 'images/arrow-right-white.png';
  arrowImg.className = 'arrow-marker';

  arrowMarker = new mapboxgl.Marker({
    element: arrowImg,
    anchor: 'center'
  }).setLngLat([-0.38, 5.542]); // Midpoint between Kasoa and Old Barrier
});

scroller
  .setup({ step: '.step', offset: 0.5, debug: false })
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

    // Show blinking marker only on slide2
    if (chapter.id === 'slide2' && accraMarker) {
      accraMarker.addTo(map);
    } else if (accraMarker) {
      accraMarker.remove();
    }

    // Show bus stop labels only from slide3 onwards
    const visibleSlides = [
      'slide3', 'slide4', 'slide5',
      'slide6', 'slide7', 'slide8',
      'slide9', 'slide10', 'slide11'
    ];
    if (visibleSlides.includes(chapter.id)) {
      busStopMarkers.forEach(marker => marker.addTo(map));
    } else {
      busStopMarkers.forEach(marker => marker.remove());
    }

    // Show route line and arrow from slide4 onwards
    if (visibleSlides.includes(chapter.id)) {
      map.setPaintProperty('fare-route-line', 'line-opacity', 1);
    } else {
      map.setPaintProperty('fare-route-line', 'line-opacity', 0);
    }

    // Show arrow on slide 4 only
    if (chapter.id === 'slide4') {
      arrowMarker.addTo(map);
    } else if (arrowMarker) {
      arrowMarker.remove();
    }
  });
