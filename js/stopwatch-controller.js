(function () {
  'use strict';

  angular.module('StopwatchControllers')
 	 .controller('StopwatchController', ['$scope', function($scope) {
 	 	$scope.time = 10;

 	 	$scope.setTime = function(minutes) {
 	 		$scope.time = (minutes > 0) ? minutes : $scope.customTime;
 	 	};
	}]);
}());