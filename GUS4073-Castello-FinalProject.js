  mapboxgl.accessToken = 'pk.eyJ1Ijoib2Nhc3RlbGxvIiwiYSI6ImNrdmg2ZW1ybTF5a3EydnFpNGZ5bTVjcDQifQ.8A9RLtH42G7Ou_nQnuxatA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
  //  center: [-75.1497, 39.9812], // starting position center is Temple
    center: [-98.35,39.50], // starting position is center of cont US
  //  center: [-77.448, 40.538], // starting position is center of PA
    zoom: 3.5 // set the starting zoom level
  });

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  // Set a zoom threshold for elements that appear/disappear as the user zooms in
  const zoomThreshold = 6;

  map.on('load', () => {

    // Add geojson for library chats by state
    map.addSource('us_chats', {
      'type': 'geojson',
      'data': 'USCount_chats.geojson'
    });

    // Add geojson for PA library chats by county
    map.addSource('pa_chats', {
      'type': 'geojson',
      'data': 'PACount_chats.geojson'
    });

  // Add layers for library chats by state of origin
  map.addLayer({
      'id': 'us_chats-polygon',
      'type': 'fill',
      'source': 'us_chats',
      'maxzoom': zoomThreshold,
      'layout': {},
      'paint': {
        'fill-color': {
                property: 'NUMPOINTS',
                stops: [
                 [0,"#ffffff"],
                 [5, "#b2e0ab"],
                 [10, "#98d593"],
                 [25, "#5bb86a"],
                 [50, "#2a924a"],
                 [100, '#00441b'],
                 [1000, '#000000']
                ]
            },
        'fill-opacity': .8
          }
        },
    'state-label'
      );

  map.addLayer({
      'id': 'us_chats-bound',
      'type': 'line',
      'source': 'us_chats',
      'maxzoom': zoomThreshold,
      'paint': {'line-color': '#000',
      'line-width': 1
          }
        },
    'state-label'
      );

  // Set a popup to show the state name and number of chats received
  map.on('click', 'us_chats-polygon', (e) => {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.NAME + ', ' + e.features[0].properties.NUMPOINTS + ' chats')
      .addTo(map);
  });

  // Add layer for library chats from PA by county of origin
  map.addLayer({
      'id': 'pa_chats-polygon',
      'type': 'fill',
      'source': 'pa_chats',
      'minzoom': zoomThreshold,
      'layout': {},
      'paint': {
        'fill-color': {
                property: 'NUMPOINTS',
                stops: [
                 [0,"#ffffff"],
                 [5, "#b2e0ab"],
                 [10, "#98d593"],
                 [25, "#5bb86a"],
                 [50, "#2a924a"],
                 [100, '#00441b'],
                 [1000, '#000000']
                ]
              },
         'fill-opacity': 1
          }
        },
    'settlement-label'
      );

  map.addLayer({
      'id': 'pa_chats-bound',
      'type': 'line',
      'source': 'pa_chats',
      'minzoom': zoomThreshold,
      'paint': {'line-color': '#000',
      'line-width': 1
          }
        },
    'settlement-label'
      );

  // Set a popup to show the state name and number of chats received
  map.on('click', 'pa_chats-polygon', (e) => {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.COUNTY_NAM + ' County, ' + e.features[0].properties.NUMPOINTS + ' chats')
      .addTo(map);
  });

  // Add a marker for Temple University
  const marker1 = new mapboxgl.Marker({color: "#990033"})
    .setLngLat([-75.1497, 39.9812])
    .setPopup(new mapboxgl.Popup().setHTML("<h1>Temple University</h1>")) // add popup
    .addTo(map);

  // Add a legend
  var layers = ['<5', '6-10', '11-25', '26-50', '51-100', '101-1000', '>1000'];
  var colors = ["#ffffff", "#b2e0ab", "#98d593", "#5bb86a", "#2a924a", '#00441b', '#000000'];
  for (i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var color = colors[i];
      var item = document.createElement('div');
      var key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;var value = document.createElement('span');
      value.innerHTML = layer;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
    }

});
