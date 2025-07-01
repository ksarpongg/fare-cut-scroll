mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  pitch: config.chapters[0].location.pitch,
  bearing: config.chapters[0].location.bearing
});

let accraMarker;

map.on('load', () => {
  // Ghana border
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

  // Static bus stop labels
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
    new mapboxgl.Marker(el)
      .setLngLat(stop.coords)
      .addTo(map);
  });

  // Create blinking Greater Accra marker
  const accraEl = document.createElement('div');
  accraEl.className = 'pulse-marker';
  accraMarker = new mapboxgl.Marker(accraEl)
    .setLngLat([-0.22, 5.65]);
});

const scroller = scrollama();

scroller
  .setup({
    step: '.step',
    offset: 0.5,
    debug: false
  })
  .onStepEnter(response => {
    const chapter = config.chapters.find(chap => chap.id === response.element.id);
    if (chapter && chapter.location) {
      map.flyTo({
        center: chapter.location.center,
        zoom: chapter.location.zoom,
        pitch: chapter.location.pitch,
        bearing: chapter.location.bearing,
        speed: 0.8,
        essential: true
      });
    }

    // Control blinking marker
    if (response.element.id === 'slide2') {
      accraMarker.addTo(map);
    } else {
      accraMarker.remove();
    }
  });
