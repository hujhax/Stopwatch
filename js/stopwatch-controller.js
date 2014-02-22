(function () {
  'use strict';

  angular.module('StopwatchControllers')
 	 .controller('StopwatchController', ['$scope', 'stopwatch', function($scope, stopwatch) {
 	 	$scope.time = 10;
 	 	$scope.myStopwatch = stopwatch;

 	 	$scope.setTime = function(minutes) {
 	 		$scope.myStopwatch.data.value = minutes * 600;
 	 		$scope.myStopwatch.start();
 	 	};

	}]);
}());