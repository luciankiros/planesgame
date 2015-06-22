var Funcs = function() {

    var fact = function(n) {
        if (n <= 1)
            return 1;
        return n * fact(n - 1);
    };

    var fibb = function(n) {
        if (n < 3)
            return 1;

        return fibb(n - 1) + fibb(n - 2);
    };

    return {
        fact: fact,
        fibb: fibb
    };
};
