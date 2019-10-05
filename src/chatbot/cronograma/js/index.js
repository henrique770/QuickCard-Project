var app = angular.module('myApp', ['ui.bootstrap', 'ui.calendar']);

app.controller('Ctrl', function($scope, $uibModal, $log, $compile, uiCalendarConfig) {
    $scope.teste = "Calendário";

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = [{
        title: 'All Day Event',
        start: new Date(y, m, 1)
    }, {
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2)
    }, {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false
    }, {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false
    }, {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false
    }, {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'https://google.com/'
    }];

    /* event source that calls a function on every view switch */
    $scope.eventSources = [$scope.events];

    /* Render Tooltip */
    $scope.eventRender = function(event, element, view) {
        element.attr({
            'uib-tooltip': 'editar: ' + event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };

    $scope.alertOnEventClick = function(date, jsEvent, view, size) {
        $scope.selected = date;
        // Modal

        $scope.animationsEnabled = true;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.selected;
                }
            }
        });

        $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
        // FIM Modal

    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
    };
    $scope.renderCalender = function(calendar) {
        if (uiCalendarConfig.calendars[calendar]) {
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
    };

    var currentLangCode = 'pt-br';
    $scope.uiConfig = {
        calendar: {
            defaultView: 'month',
            height: "auto",
            lang: currentLangCode,
            editable: true,
            eventTextColor: '#fff',
            eventBorderColor: '#9987B5',
            eventBackgroundColor: '#9987B5',
            header: {
                left: 'title',
                center: 'month,agendaWeek,agendaDay',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };

});

app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items) {

    $scope.nome = items.title;
    // Mudando formato como é mostrado DateTime no input
    $scope.ted = items.start;
    $scope.date = moment($scope.ted).format("DD-MM-YYYY HH:mm");
    $scope.gfExtenso = moment(items.start).format("dddd, Do MMMM YYYY, HH:mm a");
    // FIM Mudando formato como é mostrado DateTime no input

    $scope.items = items;

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function() {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});