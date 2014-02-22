angular.module('StopwatchFilters', []).filter('minutes', function() {
  return function(input) {
  	var minusSign = (input < 0) ? "-" : "";
  	input = Math.abs(input);
    var minutes = Math.floor(input/600);
    var seconds = Math.floor(input%600/10);
    var tenths = input%10;
    if (seconds < 10)
    	seconds = "0" + seconds;
    return minusSign + minutes + ":" + seconds + "." + tenths;
  };
});

angular.module('StopwatchFilters').filter('iif', function() {
   return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
});