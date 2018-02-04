//calculation for miles shit
function sortEvents(){
	// // should be this: getTargetInfo(eventObject[0].title);
	point1Info(eventObject[0], eventObject[3]);
	point1Info(eventObject[1], eventObject[2]);
	point1Info(eventObject[2], eventObject[1]);
	point1Info(eventObject[3], eventObject[0]);
	//point1Info(eventObject[2], eventObject[3]);
	point1 = addressFormat1; //the immediate created placeID is stored in vacationHome
	point2 = addressFormat2;
	//getEvents();

	
	
}

	
	//problem: inconsistent GET request


	// // point1Info(eventObject[0]);
	// // setTimeout(function(){point1 = addressFormat1;}, 3000); //the immediate created placeID is stored in vacationHome
	// point2Info(eventObject[2]);
	// point2 = addressFormat2;
	// twoPointInfo(point1, point2);


	// // point1Info(eventObject[0]);
	// // setTimeout(function(){point1 = addressFormat1;}, 3000); //the immediate created placeID is stored in vacationHome
	// point2Info(eventObject[3]);
	// setTimeout(function(){point2 = addressFormat2;}, 3000);
	// setTimeout(function(){twoPointInfo(point1, point2);},3000);

	// for(var i = 0; i < 1; i++){
	// 	point1Info(eventObject[i]);
	// 	setTimeout(function(){point1 = addressFormat1;}, 3000);
	// 	for(var j = 1; j < 4; j++){
	// 		 //the immediate created placeID is stored in vacationHome
	// 		point2Info(eventObject[j]);
	// 		setTimeout(function(){point2 = addressFormat2;}, 3000);
	// 		setTimeout(function(){}, 3000);
	// 		setTimeout(function(){twoPointInfo(point1, point2);},3000);
	// 	}
		
	// }







function twoPointInfo(point1, point2){
	fetch("https://proxy-sauce.glitch.me/https://maps.googleapis.com/maps/api/directions/json?\
		key=AIzaSyACC7GudsQruzi7LLyFrLRq78HnjJvJBlU&\
		mode=driving&\
		destination=" + point1 + "&origin=" + point2 + "\"")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(point1 + " " + point2);
      console.log(data.routes[0].legs[0].distance.text);
      console.log(data.routes[0].legs[0].duration.text);
	});
}