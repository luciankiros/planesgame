var app = angular.module('app', ['ngRoute']);

// create routes
app.config(function ($routeProvider) {
    $routeProvider.when('/',
        {
            templateUrl: 'app/start/templates/start.html',
            controller: 'StartCtrl'
        }
    ).when('/start',
        {
            templateUrl: 'app/start/templates/start.html',
            controller: 'StartCtrl'
        }
    ).when('/game',
        {
            templateUrl: 'app/game/templates/game.html',
            controller: 'GameCtrl'
        }
    );
});
