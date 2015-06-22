app.factory('sharedData', function () {
    return {
        gameCode: '',
        iAmHost: false,
        privateGame: false
    };
});

app.value('canvas', canvas);

app.value('toastr', toastr);

app.factory('notify', function (toastr, $location) {
    return {
        info: function (message, forRoute) {
            if ($location.url() === forRoute) {
                toastr.info(message);
            }
        },
        success: function (message) {
            toastr.success(message);
        },
        warning: function (message) {
            toastr.warning(message);
        },
        error: function (message) {
            toastr.error(message);
        }
    };
});

app.factory('server', function () {
    var gameHub = $.connection.gameHub;

    var server = {
        client: {},
        server: {},
        started: false
    };

    // client callbacks
    gameHub.client.onConnectToGame = function (connect) {
        if (server.client.onConnectToGame) {
            server.client.onConnectToGame(connect);
        }
    };

    gameHub.client.onOpponentConnected = function () {
        if (server.client.onOpponentConnected) {
            server.client.onOpponentConnected();
        }
    };

    gameHub.client.onOpponentReady = function () {
        if (server.client.onOpponentReady) {
            server.client.onOpponentReady();
        }
    };

    gameHub.client.onStartGame = function () {
        if (server.client.onStartGame) {
            server.client.onStartGame();
        }
    };

    gameHub.client.onHitResult = function (hitResult) {
        if (server.client.onHitResult) {
            server.client.onHitResult(hitResult);
        }
    };

    gameHub.client.onOpponentPlayAgain = function (wants) {
        if (server.client.onOpponentPlayAgain) {
            server.client.onOpponentPlayAgain(wants);
        }
    };

    gameHub.client.onGameCanStartAgain = function () {
        if (server.client.onGameCanStartAgain) {
            server.client.onGameCanStartAgain();
        }
    };

    gameHub.client.onMessageReceived = function (message) {
        if (server.client.onMessageReceived) {
            server.client.onMessageReceived(message);
        }
    };

    gameHub.client.onDraw = function (p1, p2, color, lineWidth) {
        if (server.client.onDraw) {
            server.client.onDraw({ x: p1.X, y: p1.Y }, { x: p2.X, y: p2.Y }, color, lineWidth);
        }
    };

    gameHub.client.onClearDraw = function () {
        if (server.client.onClearDraw) {
            server.client.onClearDraw();
        }
    };

    gameHub.client.onOpponentDisconnected = function () {
        if (server.client.onOpponentDisconnected) {
            server.client.onOpponentDisconnected();
        }
    };

    gameHub.client.onNotifyGameNumbers = function (publicGamesCount) {
        if (server.client.onNotifyGameNumbers) {
            server.client.onNotifyGameNumbers(publicGamesCount);
        }
    };

    // server methods
    server.server.createGame = gameHub.server.createGame;
    server.server.connectToGame = gameHub.server.connectToGame;
    server.server.iAmReady = gameHub.server.iAmReady;
    server.server.gameCanStart = gameHub.server.gameCanStart;
    server.server.hit = gameHub.server.hit;
    server.server.playAgain = gameHub.server.playAgain;
    server.server.gameCanStartAgain = gameHub.server.gameCanStartAgain;
    server.server.sendMessage = gameHub.server.sendMessage;
    server.server.draw = gameHub.server.draw;
    server.server.clearDraw = gameHub.server.clearDraw;
    server.server.clientOnStartPage = gameHub.server.clientOnStartPage;

    // start connection after client methods have been declared
    $.connection.hub.start()
        .done(function () {
            server.started = true;
        });

    return server;
});
