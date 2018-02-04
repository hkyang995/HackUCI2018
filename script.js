//global variables
var userDest = "";
var gTitle = "";
var gHr = 0;
var gMin = 0;
var eventObject = new Array();


//angular code
angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular
  .module('mwl.calendar.docs')
  .controller('EditableDeletableEventsCtrl', function(moment, alert, calendarConfig) {
    
    var vm = this;
    vm.events = [
      {
        title: 'Editable event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('month').toDate(),
        actions: [{
          label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
          onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
          }
        }]
      }, {
        title: 'Deletable event',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().startOf('month').toDate(),
        actions: [{
          label: '<i class=\'glyphicon glyphicon-remove\'></i>',
          onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
          }
        }]
      }, {
        title: 'Non editable and deletable event',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('month').toDate()
      }
    ];

    vm.calendarView = 'week';
    vm.viewDate = moment().startOf('month').toDate();
    vm.cellIsOpen = true;

    //adds sorted events to calendar
    vm.addEvent = function() {
      for(var i = 0; i < eventObject.length; i++){
        vm.events.push({
          title: eventObject[i].title,
          startsAt: moment().startOf('day').toDate(),
          endsAt: moment().endOf('day').toDate(),
          color: calendarConfig.colorTypes.important,
          draggable: false,
          resizable: true
        });
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
      else{
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
    //gets form data
    $scope.submitForm = function(title, duration_hr, duration_min){
        gTitle = title;
        gHr = duration_hr;
        gMin = duration_min;

        document.getElementById("getInfo").style.display="none";
        document.getElementById("getInfoForm").reset();
        
        var temp = {
          title: gTitle,
          hr: gHr,
          min: gMin
        };
        //shows button when the first form is submitted

        if($scope.schedules.length == 0){
          document.getElementById("rmvSingle").style.display="inline";
        }
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
}
