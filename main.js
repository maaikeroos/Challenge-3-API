// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFhaWtlcm9vcyIsImEiOiJjazk4Nm9wMm4wM3c3M2hrNHhjajB5MDJnIn0.UEv_Tbcl6khXQEcMUbB-NA';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/maaikeroos/ck987ui7d2dwk1io31rw1prjl',
  center: [4.764167, 52.308056],
  zoom: 10,
  // Positioning the map on a certain longitute + latitude and zooming in
  // Let op de volgorde van de lat, lon!!

});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wacht tot de map en styles geladen zijn
map.on("load", function () {

  // laad een extern bestand
  map.loadImage("airplane-silhouette-115494046411mqduhput3.png", function (error, image) {

      // guard: check voor een laad error
      if (error) throw error;

      // voeg image toe
      map.addImage("airplane", image);

      // defineer een punt in het geheugen
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [4.764167, 52.308056]
            }
          }]
        }
      });

      // plak de nieuwe source "point" op de kaart in een eigen layer
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": "airplane",
          "icon-size": 0.15
        }
      });
    }
  );
});

// Tweede map
mapboxgl.accessToken = 'pk.eyJ1IjoibWFhaWtlcm9vcyIsImEiOiJjazk4Nm9wMm4wM3c3M2hrNHhjajB5MDJnIn0.UEv_Tbcl6khXQEcMUbB-NA';

// Initialate map
var map2 = new mapboxgl.Map({
  container: 'map2',
  style: 'mapbox://styles/maaikeroos/ck987ui7d2dwk1io31rw1prjl',
  center: [4.764167, 52.308056],
  zoom: 10,
  // Positioning the map on a certain longitute + latitude and zooming in
  // Let op de volgorde van de lat, lon!!

});

// Add zoom and rotation controls to the map.
map2.addControl(new mapboxgl.NavigationControl());

var cities = [
  {
    name: 'Amsterdam',
    coordinates: [4.895168, 52.370216]
  },
  {
    name: 'Hoofddorp',
    coordinates: [4.690704, 52.306085]
  },
  {
    name: 'Haarlem',
    coordinates: [4.646219, 52.387386]
  },
  {
    name: 'Amstelveen',
    coordinates: [4.870087, 52.3114207]
  },
];

var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = 'c8efd72d97019e62517256b5136de175';

map2.on('load', function () {
  cities.forEach(function(city) {
    //Dit is voor meerdere lat en long coords
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    //Hiermee krijg je informatie over het huidige weer van de steden gebasseerd op coords
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        //Het weer met het bijbehorende icoon
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map2.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map2.addImage("weatherIcon_" + city.name, image);
      map2.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map2.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.4
        }
      });
    }
  );
}
