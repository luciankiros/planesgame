app.directive('opponentDisconnected', function (server, $location) {
    return {
        restrict: 'E',
        templateUrl: 'app/game/templates/opponent-disconnected.html',
        scope: {
            code: '='
        },
        controller: function ($scope){
            $scope.backToStart = function () {
                $location.url('/start');
            };
        }
    };
});