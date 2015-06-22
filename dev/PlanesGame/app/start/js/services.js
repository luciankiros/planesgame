app.factory('startRepo', function ($http) {
    return {
        createGame: function (successCallback) {
            $http({ method: 'POST', url: 'api/game' }).
                success(function(data) {
                    successCallback(data.gameCode);
                });
        },

        updateGamesCount: function (successCallback) {
            $http({ method: 'GET', url: 'api/game/PublicGamesCount' }).
                success(function (data) {
                    successCallback(data);
                });
        },

        getPublicGameCode: function (successCallback) {
            $http({ method: 'GET', url: 'api/game/PublicGameCode' }).
                success(function (data) {
                    successCallback(data.replace(new RegExp('"', 'g'), ''));
                });
        }
    };
});