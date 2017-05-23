(function () {
  'use strict';

  angular.module('StopwatchControllers')
 	 .controller('StopwatchController', ['$scope', 'stopwatch', 'keyboardManager', function($scope, stopwatch, keyboardManager) {
 	 	$scope.myStopwatch = stopwatch;
 	 	$scope.customTime = '15';

 	 	var inputDisabled = {'inputDisabled': true};

		keyboardManager.bind('1', function() {
			$scope.startStopwatch(10);
		}, inputDisabled);

		keyboardManager.bind('2', function() {
			$scope.startStopwatch(20);
		}, inputDisabled);

		keyboardManager.bind('3', function() {
			$scope.startStopwatch(30);
		}, inputDisabled);

		keyboardManager.bind('5', function() {
			$scope.startStopwatch(5);
		}, inputDisabled);

		keyboardManager.bind('6', function() {
			$scope.startStopwatch(60);
		}, inputDisabled);

		keyboardManager.bind('c', function() {
			$scope.startStopwatch($scope.customTime);
		}, inputDisabled);

		keyboardManager.bind('C', function() {
			$scope.startStopwatch($scope.customTime);
		}, inputDisabled);

		keyboardManager.bind(' ', function() {
			$scope.toggleStopwatch();
		}, inputDisabled);

		keyboardManager.bind('enter', function() {
			$scope.toggleStopwatch();
		}, inputDisabled);

		keyboardManager.bind('escape', function() {
			$scope.clearStopwatch();
		}, inputDisabled);

		$scope.startStopwatch = function (minutes) {
        	document.activeElement.blur();
        	$scope.myStopwatch.start(minutes);
		}

		$scope.toggleStopwatch = function () {
        	document.activeElement.blur();
        	$scope.myStopwatch.toggle();
		}

		$scope.clearStopwatch = function () {
        	document.activeElement.blur();
        	$scope.myStopwatch.clear();
		}
	}]);
}());