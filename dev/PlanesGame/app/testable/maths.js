var Maths = function() {

    var add = function(a, b) {
        return a + b;
    };

    var multiply = function(a, b) {
        return a * b;
    };
	
	var max = function(a, b) {
		var m = a > b ? a : (a < b ? b : a);
		
		return m;
	};
	
	var min = function(a, b) {
		var m = a < b ? a : b;
		return m;
	};

    return {
        add: add,
        multiply: multiply,
		max: max,
		min: min
    };
};