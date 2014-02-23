angular.module('StopwatchFilters', []).filter('minutes', function() {
  return function(milliseconds) {
  	var minusSign = (milliseconds < 0) ? "-" : "";
  	milliseconds = Math.abs(milliseconds);
    var minutes = Math.floor(milliseconds/60000);
    var seconds = Math.floor((milliseconds%60000)/1000);
    var tenths = Math.floor((milliseconds%1000)/100);
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