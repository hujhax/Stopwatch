angular.module('StopwatchFilters', []).filter('minutes', function() {
  return function(input) {
    var minutes = Math.floor(input/600);
    var seconds = Math.floor(input%600/10);
    var tenths = input%10;
    if (seconds < 10)
    	seconds = "0" + seconds;
    return minutes + ":" + seconds + "." + tenths;
  };
});