app.directive('draw', function (canvas, server) {
    return {
        restrict: 'E',
        templateUrl: 'app/game/templates/draw.html',
        scope: {
            code: '=',
            connected: '='
        },

        controller: function ($scope) {
            $scope.visible = false;
            $scope.isDirty = false;

            // show hide
            $scope.showHide = function () {
                if ($scope.visible) {
                    $scope.visible = false;
                }
                else {
                    $scope.visible = true;
                }
            };

            $scope.getDrawButtonClass = function () {
                return $scope.isDirty ? 'new-draw' : '';
            };
        },

        link: function (scope, element, attrs) {
            var el = element[0];
            scope.$watch("visible", function (value) {
                if (typeof value === "undefined") {
                    return;
                }

                if (value) {
                    scope.isDirty = false;
                    $(el).addClass('maximize');
                    $(el).removeClass('minimize');
                }
                else {
                    $(el).addClass('minimize');
                    $(el).removeClass('maximize');
                }
            });

            // draw
            scope.color = 'black';
            scope.lineWidth = 5;

            var onDraw = function (p1, p2, color, lineWidth) {
                server.server.draw(scope.code, p1, p2, color, lineWidth);
            };

            scope.$watch("connected", function (value) {
                canvas.enable(value);
            });

            server.client.onDraw = function (p1, p2, color, lineWidth) {
                canvas.draw(p1, p2, color, lineWidth);

                if (!scope.visible) {
                    scope.isDirty = true;
                    scope.$apply();
                }
            };

            scope.setColor = function (color) {
                scope.color = color;
                canvas.setColor(color);
            };

            scope.setLineWidth = function (lineWidth) {
                scope.lineWidth = lineWidth;
                canvas.setLineWidth(lineWidth);
            };

            scope.clear = function () {
                server.server.clearDraw(scope.code);

                canvas.clear();
            };

            server.client.onClearDraw = function () {
                canvas.clear();
            };

            canvas.init('myCanvas', onDraw);
        }
    };
});