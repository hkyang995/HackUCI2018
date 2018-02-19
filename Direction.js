var distBtwn = [];
var tempObj = []; // temporary to hold "sorted" array
var savedObj = [];
//calculation for miles shit
var isSorted = false;
function sortEvents(cb){
	// holds distance between locations
	
	var t = eventObject[0]; //0 is the root

	//"loops" through the events and sorts them
	var i = 0;
	
	iLoop(i, function(err, success){
		console.log("test");
		if(err) throw err;
		printStuff();
	});

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
var iLoop = function(i, cb){
	var p = (i + 1);
	pLoop(p, i, function(err, success){
		if(err) throw err;
		// //sort stuff here
		
		// savedObj[i] = eventObject.shift();
		// console.log("Saved:" + savedObj[i]);
		var tlen = eventObject.length;
		tempObj = eventObject;
		for(var k = (i + 1); k < tlen; k++){
			console.log("Comparing " + tempObj[i + 1] + "(" + distBtwn[i] + ") with " + tempObj[k] + "(" + distBtwn[k - 1] + ")");			
			if(distBtwn[i] > distBtwn[k - 1]){
				console.log("SWITCHING " + tempObj[i + 1] + "(" + distBtwn[i] + ") with " + tempObj[k] + "(" + distBtwn[k - 1] + ")");
				//switch names
				var temp = tempObj[i + 1];
				tempObj[i + 1] = tempObj[k];
				tempObj[k] = temp;
				//switch distance
				var temp2 = distBtwn[i];
				distBtwn[i] = distBtwn[k - 1];
				distBtwn[k - 1] = temp2;


			}			
		}

		if(i < eventObject.length){
			
			distBtwn = [];
			i = i + 1;
			iLoop(i, cb);
		}
		if(i == eventObject.length - 1){
			eventObject = tempObj;
			if(cb){
				cb(null, success);
			}
		}

	});
}

var printStuff = function(){
	for(var t=0; t < eventObject.length; t++){
		console.log(eventObject[t]);
	}
}

//a fake "inner" loop that gets the distances between destinations
var pLoop = function(p, i, cb){
		point1Info(eventObject[i], eventObject[p], function(err, success){
			if(err) throw err;
			distBtwn[p - 1] = distanceAmt;
			console.log("Location: " + eventObject[p] + ":" + distBtwn[p-1]);
			//console.log("Distanceamt: " + distBtwn[p]);
				
			
			if(p < eventObject.length){
				p = p + 1;
				pLoop(p, i, cb);
			}
			if(p == eventObject.length){
				cb(null, success);								
			}					
	});
			
}



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

