//calculation for miles shit
function sortEvents(){
	// // should be this: getTargetInfo(eventObject[0].title);
	setTimeout(function(){point1Info(eventObject[0], eventObject[1]);},0);
	setTimeout(function(){console.log(distanceAmt);},3000);
	setTimeout(function(){point1Info(eventObject[0], eventObject[2]);},3001);
	setTimeout(function(){console.log(distanceAmt);},6000);
	setTimeout(function(){point1Info(eventObject[0], eventObject[3]);},6001);
	setTimeout(function(){console.log(distanceAmt);},9000);


	var currentMinDist = 0.0;
	shortestIndex = 0;
	for(var j = 0; j < eventObject.length-1;j++){ // each layer 
		for(var i = 1; i < eventObject.length; i++){
			if(shortestIndex == 0){ 
				remove(eventObject, shortestIndex);
			}
			point1Info(eventObject[shortestIndex], eventObject[i]);
			//assuming it works
			if (currentMinDist > parseFloat(distanceAmt)){
				shortestIndex = i;
				currentMinDist = distanceAmt;
			}
		}
		remove(eventObject, shortestIndex);
	}
	
	//getEvents();	
}

function twoPointInfo(point1, point2){
	fetch("https://proxy-sauce.glitch.me/https://maps.googleapis.com/maps/api/directions/json?\
		key=AIzaSyACC7GudsQruzi7LLyFrLRq78HnjJvJBlU&\
		mode=driving&\
		destination=" + point1 + "&origin=" + point2 + "\"")
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      console.log(point1 + " to " + point2);
      console.log(data.routes[0].legs[0].distance.text);
      distanceAmt = data.routes[0].legs[0].distance.text;
      console.log(data.routes[0].legs[0].duration.text);
      return distanceAmt;
	});
}

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

