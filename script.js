//global variables
var timeLeft = 1440;
var userDest = "";
var gTitle = "";
var gHr = 0;
var gMin = 0;
var totalMin = 0;
var eventObject = new Array();
var tripStart = Date.now();
var wakeUpTime;
var bedTime;


//angular code
angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular
  .module('mwl.calendar.docs')
  .controller('EditableDeletableEventsCtrl', function(moment, alert, calendarConfig) {
    
    var vm = this;    

    vm.events = [];

    vm.calendarView = 'week';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellIsOpen = true;

    //adds events to calendar
    vm.addEvent = function() {
      //we need to sort them first!

      var tomorrow = [];
      //add 0th object to tomorrow as it is the place of temporary residence
      tomorrow.push(eventObject[0]);
  
      for(var i = 0; i < eventObject.length; i++){
        //checks if event will fit into the current day
        if(timeLeft >= eventObject[i].totMin){
          timeLeft = (timeLeft - eventObject[i].totMin);
          //inputs event into calendar
          vm.events.push({
            title: eventObject[i].title,
            startsAt: tripStart,
            color: calendarConfig.colorTypes.important,
            draggable: false,
            resizable: true
          });
        } 
        else{ //if it doesnt fit in that day, it waits until "tomorrow"
          if (i != 0){
            tomorrow.push(eventObject[i]);
          }          
        }
        
      }

      //we set eventObject equal to tomorrow and recurse the function to find a schedule for the next day if
      //there are objects still needing to be put into the schedule
      if(tomorrow.length > 1){
        var newTripStart = moment(tripStart).add(1, 'd').toDate();
        tripStart = newTripStart;
        eventObject = tomorrow;
        timeLeft = 1440;
        vm.addEvent();
      }

      eventObject = [];     
    };
  })
  .controller('btnCtrl', ['$scope', function($scope){
    $scope.topMsg = "Create Schedule";

    //Executes when submit button is clicked.
    //Displays calendar and collects user destination.
    $scope.showCal = function(){      
      var userDestination = document.getElementById("destinationInput").value;

      //displays error if destination is blank
      //else shows calendar and collects destination
      if (userDestination == ""){
        alert("Please enter a destination.");
      } 
      else if(document.getElementById('startingDate').value == ""){
        alert("Please enter a date.");
      }
      else{
        //get starting date from the form
        tripStart = document.getElementById('startingDate').value;
        wakeUpTime = document.getElementById('startTime').value;
        bedTime = document.getElementById('endTime').value;



        //calculate the amount of hours left in the day after sleep is taken into account
        timeLeft = timeLeft - ((parseInt(wakeUpTime.slice(0,2)) * 60) + parseInt(wakeUpTime.slice(3)));
        //calculating the time the user goes to bed
        if( parseInt(bedTime.slice(0,2)) <= 13){
          timeLeft = timeLeft + ((parseInt(bedTime.slice(0,2))*60) + parseInt(bedTime.slice(3)));
        }
        else{
          timeLeft = timeLeft - ((parseInt(bedTime.slice(0,2))*60) + parseInt(bedTime.slice(3)));
        }

        //display calendar
        document.getElementById("calendar_wrapper").style.display="inline";
        document.getElementById("addEvent_wrapper").style.display="inline";
        $scope.topMsg = "Your Destination: " + userDestination;
        userDest = userDestination;
        var element = document.getElementById("inputWrapper");
        element.parentNode.removeChild(element);
      }    
    }
  }])
  .controller('addEventCtrl', ['$scope', function($scope){
    $scope.schedules = [];

    $scope.addEvent = function(){
      document.getElementById("getInfo").style.display="inline";
    }
    $scope.exitBox = function(){
      document.getElementById("getInfo").style.display="none";
      document.getElementById("getInfoForm").reset();
    }
    //gets form data
    $scope.submitForm = function(title, duration_hr, duration_min){
        gTitle = title;
        gHr = duration_hr;
        gMin = duration_min;
        totalMin = (duration_hr * 60) + duration_min;

        document.getElementById("getInfo").style.display="none";
        document.getElementById("getInfoForm").reset();
        
        var temp = {
          title: gTitle,
          hr: gHr,
          min: gMin,
          totMin: totalMin
        };

        //shows button when the first form is submitted

        if($scope.schedules.length == 0){
          document.getElementById("rmvSingle").style.display="inline";
        }

        //put temp into the array
        eventObject.push(temp); 

        $scope.schedules.push({title: gTitle, content: "Duration: " + gHr + "hrs " + gMin + "mins"});
    };
    //removes all
    $scope.removeE = function(){
      var t = $scope.schedules.length;
        for(var i = 0; i < t; i++){
          $scope.schedules.pop();
        }        
    };
    //removes one
    $scope.removeLatest = function(){
      $scope.schedules.pop();
      //hides button if nothing is in the array
      if($scope.schedules.length == 0){
        document.getElementById("rmvSingle").style.display="none";
      }
    };

  }]);

//removes events on display when theyre being sorted
//calls removeE function inside of the addEventCtrl
function rmvEvents(){
  angular.element(document.getElementById('addEvent_wrapper')).scope().removeE();
  document.getElementById("rmvSingle").style.display="none";
}
