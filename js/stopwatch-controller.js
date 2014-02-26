(function () {
  'use strict';

  angular.module('StopwatchControllers')
 	 .controller('StopwatchController', ['$scope', 'stopwatch', 'keyboardManager', function($scope, stopwatch, keyboardManager) {
 	 	$scope.myStopwatch = stopwatch;
 	 	$scope.customTime = '15';

		keyboardManager.bind('1', function() {
			$scope.myStopwatch.start(10);
		});

		keyboardManager.bind('3', function() {
			$scope.myStopwatch.start(30);
		});

		keyboardManager.bind('5', function() {
			$scope.myStopwatch.start(5);
		});

		keyboardManager.bind('c', function() {
			$scope.myStopwatch.start($scope.customTime);
		});

		keyboardManager.bind('C', function() {
			$scope.myStopwatch.start($scope.customTime);
		});

		keyboardManager.bind(' ', function() {
			$scope.myStopwatch.toggle();
		});

		keyboardManager.bind('enter', function() {
			$scope.myStopwatch.toggle();
		});

	}]);
}());