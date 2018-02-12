var distBtwn = [];

//calculation for miles shit
function sortEvents(){
	// holds distance between locations
	var tempObj = []; // temporary to hold "sorted" array
	tempObj[0] = eventObject[0]; //0 is the root

	//"loops" through the events and sorts them
	var i = 0;
	iLoop(i);
	// //compare one object with all the rest
	// //then move onto the next object and do the same thing
	// for(var i = 0; i < eventObject.length; i++){
	// 	for(var p = (i + 1); p < 5; p++){
	// 		//find the distance here
	// 		distBtwn[p] = point1Info(eventObject[i], eventObject[p]);
	// 	}
	// 	//compare the distances here
	// 	bool firstTime = true;
	// 	for(var k = (i + 1); k < 5; k++){
	// 		if(firstTime == true){
	// 			firstTime = false;
	// 			tempObj[i] = eventObject[k];
	// 			eventObject[k].pop();
	// 		}
	// 		//else if is pseudocode for now
	// 		else if(tempObj[i] < distBtwn[k]){
	// 			var temp = tempObj[i];
	// 			tempObj[i] = eventObject[k];
	// 			eventObject[k] = temp;
	// 		}
	// 	}
	// 	firstTime = true;
	// }	
}

//a fake "outer" loop that compares distances between destinations
var iLoop = function(i){
	var p = (i + 1);
	pLoop(p, i, function(err, success){
		if(err) throw err;


		if(i < eventObject.length){
			i = i + 1;
			iLoop(i);
		}

	});

	
}

//a fake "inner" loop that gets the distances between destinations
var pLoop = function(p, i, cb){
		point1Info(eventObject[i], eventObject[p], function(err, success){
			if(err) throw err;
			distBtwn[p] = distanceAmt;
			//console.log("Distanceamt: " + distBtwn[p]);
				
			if(p < eventObject.length){
				p = p + 1;
				pLoop(p, i);
			}
			if(cb){
				cb(null, success);
			}
			
				
	});
			
}

	// var myPromWrapper = function(i, p){
	// 	return new Promise(function(resolve, reject){
	// 		setTimeout(
	// 			function(){
	// 			resolve(point1Info(eventObject[i], eventObject[p]));					
	// 		},1000);
	// 	});
	// }

	
	// var askProm = function(i, p) {
	// 	myPromWrapper(i, p)
	// 	.then(function(f){
	// 		console.log(f);
	// 	})
	// 	.catch(function(e){
	// 		console.log(e);
	// 	});
	// };


function twoPointInfo(point1, point2,cb){
	fetch("https://proxy-sauce.glitch.me/https://maps.googleapis.com/maps/api/directions/json?\
		key=AIzaSyACC7GudsQruzi7LLyFrLRq78HnjJvJBlU&\
		mode=driving&\
		destination=" + point1 + "&origin=" + point2 + "\"")
    .then(response => response.json())
    .then(data => { 

      distanceAmt = data.routes[0].legs[0].distance.text;      
      distanceAmt = parseInt((distanceAmt.slice(" ")));
      if (cb){
      	cb(null, distanceAmt);
      }      
      //console.log(distanceAmt);
      return distanceAmt;
	});
}

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

