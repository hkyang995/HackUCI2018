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
        $scope.topMsg = "Your Destination: " + userDestination;
        var element = document.getElementById("inputWrapper");
        element.parentNode.removeChild(element);
      }

      
    }
  }]);
