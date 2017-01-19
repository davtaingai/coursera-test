var myControllers = angular.module('myControllers', []);

myControllers.controller('myCtrl', function ($scope, dataService, $log, $mdMedia, $mdSidenav) {

    $scope.selectTeam = function (team) {
        $scope.team = team;
        $log.info(team.team + " selected");
    }

    $scope.toggleList = function () {
        $mdSidenav('left').toggle();
    }

    dataService.getTeams().then(function (result) { $scope.teams = result; });
    dataService.getPlayers().then(function (result) { $scope.players = result; });

});

myControllers.controller('myTeamCtrl', function ($scope, dataService, localstorage) {

    // store favorite team and view in local storage
    $scope.fave = localstorage.get('nfl-fave', null);
    $scope.view = localstorage.get('nfl-view', 'player');

    $scope.setFave = function (team) {
        $scope.fave = team.team;
        $scope.team = team;
        localstorage.set('nfl-fave', team.team);
    }

    $scope.setView = function (view) {
        $scope.view = view;
        localstorage.set('nfl-view', view);
    }

    dataService.getTeams().then(function (result) { $scope.teams = result; });
    dataService.getPlayers().then(function (result) { $scope.players = result; });

});

myControllers.controller('myStandingCtrl', function ($scope, dataService, localstorage) {

    // store favorite team and view in local storage
    $scope.fave = localstorage.get('nfl-fave', null);
    $scope.view = localstorage.get('nfl-view', 'player');

    // get current location, then get data
    navigator.geolocation.watchPosition(showPosition);

    function showPosition(position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;

        dataService.getTeams().then(function (result) { $scope.teams = result; });
    }

});