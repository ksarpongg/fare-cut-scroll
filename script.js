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
  });
