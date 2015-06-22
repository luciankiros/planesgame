app.controller("StartCtrl", function ($scope, sharedData, startRepo, $location, server) {
    $scope.gameCode = '';
    $scope.publicGamesCount = 0;

    $scope.createGame = function (privateGame) {
        startRepo.createGame(function (code) {
            sharedData.gameCode = code;
            sharedData.iAmHost = true;
            sharedData.privateGame = privateGame;
            $location.url('/game');
        });
    };

    $scope.joinGame = function (code) {
        sharedData.gameCode = code;
        sharedData.iAmHost = false;
        $location.url('/game');
    };

    $scope.joinPublicGame = function () {
        startRepo.getPublicGameCode(function (code) {
            sharedData.gameCode = code;
            sharedData.iAmHost = false;
            $location.url('/game');
        });
    };

    server.client.onNotifyGameNumbers = function (publicGamesCount) {
        $scope.publicGamesCount = publicGamesCount;

        $scope.$apply();
    }

    if (server.started) {
        server.server.clientOnStartPage();
    }

    startRepo.updateGamesCount(function (publicGamesCount) {
        $scope.publicGamesCount = publicGamesCount;
    });
});