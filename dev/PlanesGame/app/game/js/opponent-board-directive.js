app.directive("opponentBoard", function (server, utils, notify) {
    return {
        restrict: "E",
        templateUrl: 'app/game/templates/opponentBoard.html',
        scope: {
            started: '=',
            connected: '=',
            ready: '=',
            myturn: '=',
            hit: '='
        },
        controller: function ($scope) {

            var states = ['free', 'unhit', 'regularhit', 'headhit'];

            // define cells
            $scope.cells = [];
            for (var idx = 0; idx < 10; idx++) {
                var line = [];
                for (var jdx = 0; jdx < 10; jdx++) {
                    line.push({
                        x: idx,
                        y: jdx,
                        state: states[0]
                    });
                }
                $scope.cells.push(line);
            };

            // compute cell class on any time
            $scope.getCellClass = function (cell) {
                var enabled = '';
                if ($scope.started && $scope.myturn) {
                    enabled = ' enabled';
                }
                return cell.state + enabled;
            };

            // on hit
            $scope.onClick = function (cell) {
                if (!$scope.started) {
                    return;
                }

                if (!$scope.myturn) {
                    notify.error('It is NOT your turn! Wait for opponent\'s hit!');
                    return;
                }

                if (cell.state !== states[0]) {
                    notify.warning('You already hit that cell. Choose another one');
                    return;
                }

                $scope.hit(cell.x, cell.y);
            };

            // on my hit result
            $scope.$on('myHitResult', function (event, hitResult) {
                var x = hitResult.X,
                    y = hitResult.Y;

                if (hitResult.Hit) {
                    if (hitResult.Head) {
                        $scope.cells[x][y].state = states[3];
                        notify.success('You hit opponent\'s plane IN DA HEAD on ' + utils.getBoardCoords(x, y) + ' !');
                    }
                    else {
                        $scope.cells[x][y].state = states[2];
                        notify.success('You hit opponent\'s plane on ' + utils.getBoardCoords(x, y) + ' !');
                    }
                }
                else {
                    $scope.cells[x][y].state = states[1];
                    notify.warning('You hit NOTHING!');
                }

                $scope.$apply();
            });
        }
    };
});