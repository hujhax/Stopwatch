(function () {
  'use strict';

  // create the angular app
  angular.module('StopwatchApp', ['StopwatchControllers', 'stopwatch', 'StopwatchFilters']);

  // set up dependency injection
  angular.module('StopwatchControllers', []);
}());