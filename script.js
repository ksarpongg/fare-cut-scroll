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
    paint: { 'line-color': '#fff', 'line-width': 2 }
  });

  // Static bus stop markers
  const stops = [
    { name: 'Kasoa', coords: [-0.423756, 5.534052] },
    { name: 'Old Barrier', coords: [-0.329034, 5.551157] },
    { name: 'Mallam', coords: [-0.286262, 5.569050] },
    { name: 'Kaneshie', coords: [-0.237506, 5.566120] },
    { name: 'Circle', coords: [-0.21684, 5.569132] }
  ];
  stops.forEach(s => {
    const el = document.createElement('div');
    el.className = 'stop-marker';
    el.innerText = s.name;
    new mapboxgl.Marker(el).setLngLat(s.coords).addTo(map);
  });

  // Blinking Greater Accra marker
  const el2 = document.createElement('div');
  el2.className = 'pulse-marker';
  accraMarker = new mapboxgl.Marker({ element: el2, offset: [0,0] })
    .setLngLat([-0.22, 5.65]);
});

const scroller = scrollama();
scroller.setup({ step: '.step', offset: 0.5, debug: false })
  .onStepEnter(resp => {
    const ch = config.chapters.find(c => c.id === resp.element.id);
    if (ch && ch.location) {
      map.flyTo({
        center: ch.location.center,
        zoom: ch.location.zoom,
        pitch: ch.location.pitch,
        bearing: ch.location.bearing,
        speed: 0.8,
        essential: true
      });
    }
    // Show only on slide2
    resp.element.id === 'slide2' ? accraMarker.addTo(map) : accraMarker.remove();
  });
