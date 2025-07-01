// config.js
const config = {
  style: 'mapbox://styles/mapbox/satellite-v9',
  accessToken: 'pk.eyJ1Ijoic2Fyc2FycG9uZ2ciLCJhIjoiY21jaTdmdWJrMGN2bDJqcGR3ZnVhNGFnOSJ9.X5uC7PYBBzIjG_6bQ6184w',
  chapters: [
    {
      id: 'slide1',
      alignment: 'center',
      location: {
        center: [-1.0232, 7.9465], // Ghana national view
        zoom: 6,
        pitch: 0,
        bearing: 0
      }
    },
    {
      id: 'slide2',
      alignment: 'center',
      location: {
        center: [-0.22, 5.65], // Greater Accra Region
        zoom: 9,
        pitch: 0,
        bearing: 0
      }
    },
    {
      id: 'slide3',
      alignment: 'center',
      location: {
        center: [-0.423756, 5.534052], // Kasoa
        zoom: 16,
        pitch: 60,
        bearing: 0
      }
    },
    {
      id: 'slide4',
      alignment: 'center',
      location: {
        center: [-0.329034, 5.551157], // Old Barrier
        zoom: 15,
        pitch: 60,
        bearing: 0
      }
    },
    {
      id: 'slide5',
      alignment: 'center',
      location: {
        center: [-0.329034, 5.551157], // Old Barrier (repeat zoom)
        zoom: 16,
        pitch: 60,
        bearing: 0
      }
    },
    {
      id: 'slide6',
      alignment: 'cent
