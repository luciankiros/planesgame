app.directive('gameEnded', function (server, $location, notify, $route) {
    return {
        restrict: 'E',
        templateUrl: 'app/game/templates/game-ended.html',
        scope: {
            winner: '=',
            code: '='
        },
        controller: function ($scope){ 
            $scope.opponentWants = false;
            $scope.opponentNotWants = false;
            $scope.waitingForOpponentToPlayAgain = false;
            $scope.leftPage = false;

            // after game ends
            $scope.backToStart = function () {
                $scope.leftPage = true;
                server.server.playAgain($scope.code, false);
                $location.url('/start');
            };

            $scope.playAgain = function () {
                if ($scope.opponentNotWants) {
                    return;
                }

                if ($scope.opponentWants) {
                    server.server.gameCanStartAgain($scope.code);
                }
                else {
                    server.server.playAgain($scope.code, true);
                    $scope.waitingForOpponentToPlayAgain = true;
                    notify.info('Waiting for opponent to respond..');
                }
            };

            server.client.onOpponentPlayAgain = function (wants) {
                $scope.waitingForOpponentToPlayAgain = false;
                if (wants) {
                    $scope.opponentWants = true;
                    notify.success('Opponent wants to play again!');
                }
                else {
                    $scope.opponentNotWants = true;
                    if (!$scope.leftPage) {
                        notify.error('Opponent did NOT want to play anymore :( chicken..');
                    }
                }

                $scope.$apply();
            };

            server.client.onGameCanStartAgain = function () {
                $route.reload();
            };
        }
    };
});