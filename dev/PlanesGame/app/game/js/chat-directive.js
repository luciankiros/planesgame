app.directive('chat', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/game/templates/chat.html',
        scope: {
            code: '=',
            connected: '='
        },

        controller: function ($scope, server) {
            $scope.messages = [];
            $scope.newMessage = '';
            $scope.visible = false;
            $scope.isDirty = false;

            $scope.sendMessage = function () {
                var message = $scope.newMessage;

                if (message.trim().length === 0) {
                    return;
                }

                $scope.messages.push({ sender: "Me", text: message });
                $scope.newMessage = '';

                server.server.sendMessage($scope.code, message);
            };

            server.client.onMessageReceived = function (message) {
                $scope.messages.push({ sender: "Opponent", text: message });

                if (!$scope.visible) {
                    $scope.isDirty = true;
                }

                $scope.$apply();
            };

            // show hide
            $scope.showHide = function () {
                if ($scope.visible) {
                    $scope.visible = false;
                }
                else {
                    $scope.visible = true;
                }
            };

            $scope.getChatButtonClass = function () {
                return $scope.isDirty ? 'new-message' : '';
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
        }
    };
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('ngScrollToBottom', function () {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            var el = element[0];
            scope.$watchCollection(attrs.ngScrollToBottom, function (newValue, oldValue) {
                el.scrollTop = el.scrollHeight;
            });
        }
    };
});
