var app = angular.module('myApp', ['myControllers', 'ngMaterial']);

app.directive('nflTeam', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/team.html'
    };
});

app.directive('nflPlayer', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/player.html'
    };
});

app.directive('nflStadium', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/stadium.html'
    };
});

app.directive('nflStanding', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/standing.html'
    };
});

app.service('dataService', ['$http', '$q', '$log', function ($http, $q, $log) {
    this.getTeams = function () {
        var dfd = $q.defer();
        $http.get('data/team.json').success(function (data) {
            dfd.resolve(data);
            $log.info(data.length + ' teams')
        }).error(function (data) {
            dfd.reject(data);
        });
        return dfd.promise;
    }

    this.getPlayers = function () {
        var dfd = $q.defer();
        $http.get('data/player.json').success(function (data) {
            dfd.resolve(data);
            $log.info(data.length + ' players')
        }).error(function (data) {
            dfd.reject(data);
        });
        return dfd.promise;
    }
}]);

app.filter('distance', function () {
    return function (team, scope) {
        var lat1 = scope.lat;
        var lon1 = scope.long;
        var lat2 = team.latitude;
        var lon2 = team.longitude;

        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        return Math.floor(dist) + ' mi';
    }
});

app.factory('localstorage', ['window', function (window) {
    return {
        set: function (key, value) {
            window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            window.localStorage.removeItem(key);
        },
        setObject: function (key, value) {
            window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse(window.localStorage[key] || '\{}');
        }
    }
}]);

app.component('playerList', {
    templateUrl: 'template/playerlist.html',
    controller: function (scope, dataService) {
        dataService.getPlayers().then(function (result) { scope.players = result; });
    }
});