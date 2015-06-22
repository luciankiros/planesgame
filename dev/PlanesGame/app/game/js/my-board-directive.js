'use strict';

app.directive("myBoard", function (server, utils, notify) {
    return {
        restrict: "E",
        templateUrl: 'app/game/templates/myBoard.html',
        scope: {
            ready: '=',
            connected: '='
        },
        controller: function ($scope) {

            //place green, place blue, place purple, defend 
            var stages = [0, 1, 2, 3];

            var states = ['free', 'missed', 'unhit', 'regularhit', 'headhit'];
            var types = ['none', 'green', 'blue', 'purple'];

            $scope.stage = stages[0];
            $scope.orientation = 'up';
            $scope.valid = true;
            $scope.started = false;

            var planes = [];

            // define cells
            $scope.cells = [];
            for (var idx = 0; idx < 10; idx++) {
                var line = [];
                for (var jdx = 0; jdx < 10; jdx++) {
                    line.push({
                        x: idx,
                        y: jdx,
                        state: states[0],
                        type: types[0],
                        showHover: false
                    });
                }
                $scope.cells.push(line);
            };

            // compute cell class on any time
            $scope.getCellClass = function (cell) {
                var cssClass = '';
                if ($scope.stage < 3) {
                    cssClass = 'enabled ';

                    if (cell.state === states[0]) {
                        if (cell.showHover) {
                            if ($scope.valid) {
                                cssClass += types[$scope.stage + 1] + ' ';
                            }
                            else {
                                cssClass += 'invalid';
                            }
                        }
                    }
                    else {
                        if (cell.state === states[2]) {
                            cssClass += cell.type;
                        }
                    }
                }
                else {
                    if (cell.state === 'free') {
                        return '';
                    }

                    cssClass += cell.state + ' ' + cell.type;
                }

                return cssClass;
            };

            // handle plane placement events
            $scope.onMouseOver = function (cell) {
                if ($scope.started || $scope.stage === 3) {
                    return;
                }

                setCellsStateOver(cell);
            };

            $scope.onMouseOut = function (cell) {
                if ($scope.started || $scope.stage === 3) {
                    return;
                }

                for (var idx = 0; idx < 10; idx++) {
                    for (var jdx = 0; jdx < 10; jdx++) {
                        $scope.cells[idx][jdx].showHover = false;
                    }
                }
            };

            $scope.onClick = function (cell) {
                var idx;

                if ($scope.started || $scope.stage === 3) {
                    return;
                }

                var planeCoords = getPlaneCoords(cell);

                var isValid = true;
                for (idx = 0; idx < planeCoords.length; idx++) {
                    isValid &= validateCellState(planeCoords[idx]);
                }

                if (!isValid) {
                    notify.error('The plane has not a valid position');
                    return;
                }

                var plane = {
                    cells: []
                };

                for (idx = 0; idx < planeCoords.length; idx++) {
                    $scope.cells[planeCoords[idx].x][planeCoords[idx].y].state = states[2];
                    $scope.cells[planeCoords[idx].x][planeCoords[idx].y].type = types[$scope.stage + 1];

                    var cell = {
                        x: planeCoords[idx].x,
                        y: planeCoords[idx].y,
                        head: idx === 0
                    };

                    plane.cells.push(cell);
                }

                planes.push(plane);

                $scope.stage++;

                switch ($scope.stage) {
                    case 1:
                        notify.info('Great! Now place the blue plane');
                        break;
                    case 2:
                        notify.info('Great! Now place the purple plane');
                        break;
                    case 3:
                        notify.info('Great! Press the Ready button to start playing');
                        break;

                    default: break;
                }
            };

            var setCellsStateOver = function (cell) {
                var planeCoords = getPlaneCoords(cell);

                $scope.valid = true;
                for (var idx = 0; idx < planeCoords.length; idx++) {
                    $scope.valid &= setCellState(planeCoords[idx]);
                }
            };

            var setCellState = function (coord) {
                if (!validateCellState(coord)) {
                    return false;
                }

                $scope.cells[coord.x][coord.y].showHover = true;
                return true;
            };

            var validateCellState = function (coord) {
                if (coord.x < 0 || coord.x > 9 || coord.y < 0 || coord.y > 9) {
                    return false;
                }

                if ($scope.cells[coord.x][coord.y].state !== states[0]) {
                    return false;
                }

                return true;
            };

            var getPlaneCoords = function (cell) {
                var coords = [],
                    x = cell.x,
                    y = cell.y;

                switch ($scope.orientation) {
                    case 'up':
                        coords.push({ x: x, y: y });
                        coords.push({ x: x + 1, y: y - 2 });
                        coords.push({ x: x + 1, y: y - 1 });
                        coords.push({ x: x + 1, y: y });
                        coords.push({ x: x + 1, y: y + 1 });
                        coords.push({ x: x + 1, y: y + 2 });
                        coords.push({ x: x + 2, y: y });
                        coords.push({ x: x + 3, y: y - 1 });
                        coords.push({ x: x + 3, y: y });
                        coords.push({ x: x + 3, y: y + 1 });
                        break;

                    case 'right':
                        coords.push({ x: x, y: y });
                        coords.push({ x: x - 2, y: y - 1 });
                        coords.push({ x: x - 1, y: y - 1 });
                        coords.push({ x: x, y: y - 1 });
                        coords.push({ x: x + 1, y: y - 1 });
                        coords.push({ x: x + 2, y: y - 1 });
                        coords.push({ x: x, y: y - 2 });
                        coords.push({ x: x - 1, y: y - 3 });
                        coords.push({ x: x, y: y - 3 });
                        coords.push({ x: x + 1, y: y - 3 });
                        break;

                    case 'left':
                        coords.push({ x: x, y: y });
                        coords.push({ x: x - 2, y: y + 1 });
                        coords.push({ x: x - 1, y: y + 1 });
                        coords.push({ x: x, y: y + 1 });
                        coords.push({ x: x + 1, y: y + 1 });
                        coords.push({ x: x + 2, y: y + 1 });
                        coords.push({ x: x, y: y + 2 });
                        coords.push({ x: x - 1, y: y + 3 });
                        coords.push({ x: x, y: y + 3 });
                        coords.push({ x: x + 1, y: y + 3 });
                        break;

                    case 'down':
                        coords.push({ x: x, y: y });
                        coords.push({ x: x - 1, y: y - 2 });
                        coords.push({ x: x - 1, y: y - 1 });
                        coords.push({ x: x - 1, y: y });
                        coords.push({ x: x - 1, y: y + 1 });
                        coords.push({ x: x - 1, y: y + 2 });
                        coords.push({ x: x - 2, y: y });
                        coords.push({ x: x - 3, y: y - 1 });
                        coords.push({ x: x - 3, y: y });
                        coords.push({ x: x - 3, y: y + 1 });
                        break;

                    default: break;
                }

                return coords;
            };

            // plane orientation
            $scope.setOrientation = function (orientation) {
                $scope.orientation = orientation;
            };

            $scope.getOrientationStyle = function (orientation) {
                var style = {};
                if (orientation === $scope.orientation) {
                    var color = '';
                    switch ($scope.stage) {
                        case 0: color = 'green'; break;
                        case 1: color = 'blue'; break;
                        case 2: color = 'purple'; break;
                        default: break;
                    }
                    style.border = '2px solid ' + color;
                }
                return style;
            };

            // undo plane placement
            $scope.undo = function () {
                $scope.stage--;

                var type = types[$scope.stage + 1];
                for (var idx = 0; idx < 10; idx++) {
                    for (var jdx = 0; jdx < 10; jdx++) {
                        if ($scope.cells[idx][jdx].type == type) {
                            $scope.cells[idx][jdx].type = types[0];
                            $scope.cells[idx][jdx].state = states[0];
                        }
                    }
                }

                planes.pop();

                switch ($scope.stage) {
                    case 0:
                        notify.info('Place the green plane');
                        break;
                    case 1:
                        notify.info('Place the blue plane');
                        break;
                    case 2:
                        notify.info('Place the purple plane');
                        break;
                    default: break;
                }
            };

            // ready
            $scope.onReadyPressed = function () {
                $scope.started = true;

                $scope.ready(planes);
            }

            setTimeout(function () {
                notify.info('Choose where to place the green plane', '/game');
            }, 2000);

            // on hit result
            $scope.$on('opponentHitResult', function (event, hitResult) {
                var x = hitResult.X,
                    y = hitResult.Y;

                if (hitResult.Hit) {
                    if (hitResult.Head) {
                        $scope.cells[x][y].state = states[4];
                        notify.error('Opponent hit your plane on the HEAD! ' + utils.getBoardCoords(x, y) + ' !!');
                    }
                    else {
                        $scope.cells[x][y].state = states[3];
                        notify.warning('Opponent hit your plane on ' + utils.getBoardCoords(x, y) + ' !');
                    }
                }
                else {
                    $scope.cells[x][y].state = states[1];
                    notify.success('Opponent hit NOTHING!');
                }

                $scope.$apply();
            });
        }
    };
});

