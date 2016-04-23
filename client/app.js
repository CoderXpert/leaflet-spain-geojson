// initialize the map
// var map = L.map('map').setView([42.35, -71.08], 13);
var map = L.map('map').setView([40.4558288, -3.6561813], 6);
// load a tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// load GeoJSON from an external file
$.getJSON("spain-provinces",function(data){
// $.getJSON("barrios_madrid.geojson",function(data){
  // add GeoJSON layer to the map once the file is loaded
  L.geoJson(data,{
    pointToLayer: function(feature,latlng){
          var marker = L.marker(latlng,{icon: ratIcon});
          marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
          return marker;
        }
  }).addTo(map);
});


// var geojsonFeature = {
//   "type": "Feature",
//   "properties": {
//     "name": "Coors Field",
//     "amenity": "Baseball Stadium",
//     "popupContent": "This is where the Rockies play!"
//   },
//   "geometry": {
//     "type": "Point",
//     "coordinates": [  40.416775,-3.70379]
//   }
// };
//
// L.geoJson(markersJson).addTo(map);
//

var smallIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  shadowSize:  [41, 41]
});

function onEachFeature(feature, layer) {
  console.log("FEATURES " + feature);
  layer.bindPopup(feature.properties.Comunidad + '<br/><a target="_blank" href="https://es.wikipedia.org/wiki/Madrid">Madrid</a>');
}

$.getJSON('markers.json', function(data) {
  console.log(data);

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(latlng, feature);
      return L.marker(latlng, {
        icon: smallIcon
      });
    },
    onEachFeature: onEachFeature
  }).addTo(map);
});
