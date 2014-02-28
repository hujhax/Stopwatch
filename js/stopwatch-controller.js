(function () {
  'use strict';

  angular.module('StopwatchControllers')
 	 .controller('StopwatchController', ['$scope', 'stopwatch', 'keyboardManager', function($scope, stopwatch, keyboardManager) {
 	 	$scope.myStopwatch = stopwatch;
 	 	$scope.customTime = '15';

 	 	var inputDisabled = {'inputDisabled': true};

		keyboardManager.bind('1', function() {
			$scope.myStopwatch.start(10);
		}, inputDisabled);

		keyboardManager.bind('3', function() {
			$scope.myStopwatch.start(30);
		}, inputDisabled);

		keyboardManager.bind('5', function() {
			$scope.myStopwatch.start(5);
		}, inputDisabled);

		keyboardManager.bind('c', function() {
			$scope.myStopwatch.start($scope.customTime);
		}, inputDisabled);

		keyboardManager.bind('C', function() {
			$scope.myStopwatch.start($scope.customTime);
		}, inputDisabled);

		keyboardManager.bind(' ', function() {
			$scope.myStopwatch.toggle();
		}, inputDisabled);

		keyboardManager.bind('enter', function() {
			$scope.myStopwatch.toggle();
		}, inputDisabled);

		keyboardManager.bind('escape', function() {
			$scope.myStopwatch.clear();
		}, inputDisabled);

	}]);
}());