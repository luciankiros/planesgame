app.controller("GameCtrl", function ($scope, $location, sharedData, notify, server) {
    $scope.gameCode = sharedData.gameCode;
    $scope.iAmHost = sharedData.iAmHost;
    $scope.privateGame = sharedData.privateGame;
    $scope.iAmReady = false;
    $scope.opponentReady = false;
    $scope.opponentConnected = $scope.iAmHost ? false : true;
    $scope.gameStarted = false;
    $scope.isMyTurn = false;
    $scope.iWon = false;
    $scope.gameEnded = false;
    $scope.opponentDisconnected = false;

    if ($scope.gameCode.length !== 8) {
        $location.url('/start');
        return;
    }

    $scope.onHit = function (x, y) {
        server.server.hit($scope.gameCode, x, y);
    };

    notify.info('Welcome to Planes Game!');

    $scope.onReady = function (planes) {
        $scope.iAmReady = true;
        server.server.iAmReady($scope.gameCode, { planes: planes });

        if ($scope.iAmHost && $scope.opponentReady && !$scope.gameStarted) {
            server.server.gameCanStart($scope.gameCode);
        }
    };

    server.client.onConnectToGame = function (connect) {
        if (!connect) {
            notify.error('Could not connect to the game!!');
            $location.url('/start');
        }
    };

    server.client.onOpponentConnected = function () {
        $scope.opponentConnected = true;
        $scope.$apply();

        notify.success('Opponent connected!');
    };

    server.client.onOpponentReady = function () {
        $scope.opponentReady = true;
        $scope.$apply();

        notify.success('Opponent is ready');

        if ($scope.iAmHost && $scope.iAmReady && !$scope.gameStarted) {
            server.server.gameCanStart($scope.gameCode);
        }
    };

    server.client.onStartGame = function () {
        $scope.gameStarted = true;

        notify.success('Game started!');

        if ($scope.iAmHost) {
            $scope.isMyTurn = true;

            notify.info('Choose an opponent\'s cell to hit');
        }
        else {
            notify.info('Wait for the opponent to hit');
        }

        $scope.$apply();
    };

    server.client.onHitResult = function (hitResult) {

        if (hitResult.Win) {
            $scope.gameEnded = true;

            $scope.iWon = $scope.isMyTurn;
        }

        $scope.isMyTurn = !$scope.isMyTurn;

        if (!$scope.isMyTurn) {
            $scope.$broadcast('myHitResult', hitResult);
        }
        else {
            $scope.$broadcast('opponentHitResult', hitResult);
        }
    };

    server.client.onOpponentDisconnected = function () {
        $scope.opponentConnected = false;
        $scope.opponentDisconnected = true;

        $scope.$apply();
    };

    if ($scope.iAmHost) {
        server.server.createGame($scope.gameCode, $scope.privateGame);
    }
    else {
        server.server.connectToGame($scope.gameCode);
    }
});