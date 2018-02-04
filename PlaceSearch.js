
//How to use:
// -getLatLong(userDest);
// -newMap(lat, lng);
// -optional: searchMarkers(lat, lng);


//global variables for data storing, etc
var lat = "";
var lng = "";
var addressFormat1 = "";
var addressFormat2 = "";
var destMap = "";
var eventObject = ["2952 Maxson Road El Monte", "19505 Galeview Drive Rowland Heights", "diamond bar high school", "the shoppes"];
var point1 = "";
var point2 = "";


function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.8829230, lng: -117.8869260},
        zoom: 15
      });

    infoWindow = new google.maps.InfoWindow;

    // // HTML5 geolocation.
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //     var pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     };

    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent('Location found.');
    //     infoWindow.open(map);
    //     map.setCenter(pos);
    //   }, function() {
    //       handleLocationError(true, infoWindow, map.getCenter());
    //   });
    // } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    // }
}

//takes user to destination 
function newMap(destLat , destLng) {
    destMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: destLat, lng: destLng},
    zoom: 15,
    scrollwheel: false
  });

  //optional: searchMarkers();
}

//searches for nearby restaurants
function searchMarkers(destMap, destLat , destLng){
  // Specify location, radius and place types for your Places API search.
  var request = {
    location: {lat: destLat, lng: destLng},
    radius: '500',
    types: ['restaurant'] //types can change 
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(destMap);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: destMap,
          position: place.geometry.location
        });
      }
    }
  });
}

// // get Lat and Long of destination 
// function getLatLong(userDest){
//   var destination = userDest;
//   axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
//     params:{
//       address: destination,
//       key: 'AIzaSyACC7GudsQruzi7LLyFrLRq78HnjJvJBlU'
//     }
//   })
//   .then(function(response){
//     console.log(response);
//     lat = response.data.results[0].geometry.location.lat;
//     lng = response.data.results[0].geometry.location.lng;
//   })
//   .catch(function(error){
//     console.log(error);
//   });
// }

//get info of destination (Lat, Long, address)
function getTargetInfo(userDest){
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
    addressFormat = response.data.results[0].formatted_address;
  })
  .catch(function(error){
    console.log(error);
  });
}

//get info of point1 (address)
function point1Info(pt1Dest, pt2Dest){
  var destin1 = pt1Dest;
  var destin2 = pt2Dest;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: destin1,
      key: 'AIzaSyACC7GudsQruzi7LLyFrLRq78HnjJvJBlU'
    }
  })
  .then(function(response){
    console.log(response);
    addressFormat1 = response.data.results[0].formatted_address;

    //nested point 2 info
    point2Info(pt2Dest);
  })
  .catch(function(error){
    console.log(error);
  });
}

//get info of point2 (address)
function point2Info(userDest){
  var destin2 = userDest;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address: destin2,
      key: 'AIzaSyACC7GudsQruzi7LLyFrLRq78HnjJvJBlU'
    }
  })
  .then(function(response){
    console.log(response);
    addressFormat2 = response.data.results[0].formatted_address;
    //nested twopointinfo
    twoPointInfo(addressFormat1, addressFormat2);
  })
  .catch(function(error){
    console.log(error);
  });
}






