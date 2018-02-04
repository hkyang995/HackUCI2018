//calculation for miles shit
function sortEvents(){
	// // should be this: getTargetInfo(eventObject[0].title);
	// setTimeout(function(){point1Info(eventObject[0], eventObject[1]);},0);
	// setTimeout(function(){console.log(distanceAmt);},3000);
	// setTimeout(function(){point1Info(eventObject[0], eventObject[2]);},3001);
	// setTimeout(function(){console.log(distanceAmt);},6000);
	// setTimeout(function(){point1Info(eventObject[0], eventObject[3]);},6001);
	// setTimeout(function(){console.log(distanceAmt);},9000);

	var newArr = [];
	var shortest = 1;
	newArr[0] = eventObject[0];

	for(var i = 1; i < eventObject.length - 1; i++){
		//get distance of 2 variables in relation to the previous one
		
		for(var y = i + 1; y < eventObject.length - 1; y++){
			console.log("i-1 " + eventObject[i - 1]);
			setTimeout(function(){point1Info(eventObject[i - 1], eventObject[y]);},3000);
			var temp1 = distanceAmt;
			setTimeout(function(){point1Info(eventObject[i - 1], eventObject[y + 1]);},4000);
			var temp2 = distanceAmt;

			if(temp1 > temp2){
				shortest = temp2;
			}
		}		

		newArr.push(eventObject[shortest]);
	}

	for(var p = 0; i > newArr.length; p++){
		console.log("Distance: " + p + newArr[p]);
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
      //console.log(data.routes[0].legs[0].distance.text);
      distanceAmt = data.routes[0].legs[0].distance.text;
      console.log(distanceAmt);
      //console.log(data.routes[0].legs[0].duration.text);
      distanceAmt = parseInt((distanceAmt.slice(" ")));
      console.log(distanceAmt);
      return distanceAmt;
	});
}

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

