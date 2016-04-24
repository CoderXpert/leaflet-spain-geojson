// initialize the map
// var map = L.map('map').setView([42.35, -71.08], 13);
var map = L.map('map').setView([40.4558288, -3.6561813], 6);
// load a tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// load GeoJSON from an external file
$.getJSON("spain-provinces",function(data){
  L.geoJson(data,{
    style: function(feature){
      feature.properties.density = Math.floor(Math.random() * 100) + 0
      var fillColor,
      density = feature.properties.density;
      if ( density > 80 ) fillColor = "#006837";
      else if ( density > 40 ) fillColor = "#31a354";
      else if ( density > 20 ) fillColor = "#78c679";
      else if ( density > 10 ) fillColor = "#c2e699";
      else if ( density > 0 ) fillColor = "#ffffcc";
      else fillColor = "#f7f7f7";  // no data
      return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    },
    onEachFeature: onEachFeature
  }).addTo(map);
});


// load GeoJSON from an external file
$.getJSON("barrios_madrid",function(data){
  L.geoJson(data,{
    onEachFeature: onEachFeature
  }).addTo(map);
});

function onEachFeature(feature, layer) {
  var properties = feature.properties
  if (properties.nombre) {
    layer.bindPopup(properties.nombre + '<br/>');
  }
  else if (properties.name) {
    setTimeout(function () {
      layer.bindPopup(properties.name + '<br/>');
    }, 10);
  }
};

var smallIcon = new L.Icon({
  iconUrl: 'http://img1.meetupstatic.com/img/94156887029318281691566697/logo.svg',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  shadowSize:  [41, 41]
});

$.getJSON('markers', function(data) {
  console.log(data);

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(latlng, feature);
      return L.marker(latlng
        //,
      //   {
      //   icon: smallIcon
      // }
    );
    },
    onEachFeature: onEachFeature
  }).addTo(map);
});


$.getJSON('meetupcities', function(data){
  data.results.forEach(function(entry) {
      console.log(entry)
      L.marker([entry.lat, entry.lon],{
        icon: smallIcon
      }).addTo(map);
  });
  console.log(data);
});
