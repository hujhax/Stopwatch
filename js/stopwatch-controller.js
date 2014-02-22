(function () {
  'use strict';

  angular.module('StopwatchControllers')
 	 .controller('StopwatchController', ['$scope', 'stopwatch', function($scope, stopwatch) {
 	 	$scope.time = 10;

 	 	$scope.setTime = function(minutes) {
 	 		$scope.time = (minutes > 0) ? minutes : $scope.customTime;
 	 	};

 	 	$scope.myStopwatch = stopwatch;
	}]);
}());