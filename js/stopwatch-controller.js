(function () {
  'use strict';

  angular.module('StopwatchControllers')
 	 .controller('StopwatchController', ['$scope', 'stopwatch', function($scope, stopwatch) {
 	 	$scope.myStopwatch = stopwatch;
 	 	$scope.customTime = '0.04';
	}]);
}());