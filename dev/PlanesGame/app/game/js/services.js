app.factory('utils', function () {
    return {
        getBoardCoords: function(x, y) {
            var letter = String.fromCharCode('A'.charCodeAt(0) + y);
            return (x + 1) + '-' + letter;
        }
    };
});