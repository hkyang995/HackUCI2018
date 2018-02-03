
//How to use:
// -getLatLong(userDest);
// -initialize(lat, lng);


//global variables for data storing, etc
var lat = "";
var lng = "";

function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.8829230, lng: -117.8869260},
        zoom: 15
      });

    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

//takes user to destination + searches for nearby restaurants
function initialize(destLat , destLng) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: destLat, lng: destLng},
    zoom: 15,
    scrollwheel: false
  });

  // Specify location, radius and place types for your Places API search.
  var request = {
    location: {lat: destLat, lng: destLng},
    radius: '500',
    types: ['restaurant'] //types can change 
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });
}


//get destination of Lat and Long
function getLatLong(userDest){
  var destination = userDest;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: destination,
      key: 'AIzaSyACC7GudsQruzi7LLyFrLRq78HnjJvJBlU'
    }
  })
  .then(function(response){
    console.log(response);
    lat = response.data.results[0].geometry.location.lat;
    lng = response.data.results[0].geometry.location.lng;
  })
  .catch(function(error){
    console.log(error);
  });
}