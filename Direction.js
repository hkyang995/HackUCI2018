var distBtwn = [];
var tempObj = []; // temporary to hold "sorted" array

var isSorted = false;
function sortEvents(cb){
	//"loops" through the events and sorts them
	var i = 0;	
	iLoop(i, function(err, success){
		if(err) throw err;
		printStuff();
		cb(err, success);
	});
}

//a fake "outer" loop that compares distances between destinations
var iLoop = function(i, cb){
	var p = (i + 1);
	pLoop(p, i, function(err, success){
		if(err) throw err;
		// //sort stuff here		
		var tlen = eventObject.length;
		tempObj = eventObject;
		for(var k = (i + 1); k < tlen; k++){
			console.log("Comparing " + tempObj[i + 1].title + "(" + distBtwn[i] + ") with " + tempObj[k].title + "(" + distBtwn[k - 1] + ")");			
			if(distBtwn[i] > distBtwn[k - 1]){
				console.log("SWITCHING " + tempObj[i + 1].title + "(" + distBtwn[i] + ") with " + tempObj[k].title + "(" + distBtwn[k - 1] + ")");
				//switch objects
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
		console.log(eventObject[t].title);
	}
}

//a fake "inner" loop that gets the distances between destinations
var pLoop = function(p, i, cb){
	if(eventObject[p]){
		point1Info(eventObject[i].title, eventObject[p].title, function(err, success){
			if(err) throw err;
			distBtwn[p - 1] = distanceAmt;
			console.log("Location: " + eventObject[p].title + ":" + distBtwn[p-1]);	
			
			if(p < eventObject.length - 1){
				p = p + 1;
				pLoop(p, i, cb);
			}
			else{
				cb(null, success);								
			}					
		});
	}
			
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