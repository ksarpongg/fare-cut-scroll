mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.chapters[0].center,
  zoom: config.chapters[0].zoom,
  pitch: config.chapters[0].pitch || 0,
  bearing: config.chapters[0].bearing || 0
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
    if (chapter) {
      map.flyTo({
        center: chapter.center,
        zoom: chapter.zoom,
        pitch: chapter.pitch || 0,
        bearing: chapter.bearing || 0,
        speed: 0.8,
        essential: true
      });
    }
  });
