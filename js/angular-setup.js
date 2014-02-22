(function () {
  'use strict';

  // create the angular app
  angular.module('StopwatchApp', ['StopwatchControllers', 'stopwatch', 'StopwatchFilters']);

  // set up dependency injection
  angular.module('StopwatchControllers', []);


  angular
  .module('stopwatch', [])
  .constant('SW_DELAI', 100)
  .factory('stopwatch', function (SW_DELAI,$timeout) {
      var data = { value: 0, running: false};

      var stopwatch = null;
          
      var start = function () {
          data.running = true;
          stopwatch = $timeout(function() {
              if (data.value > 0) {
                data.value--;
                start();
              }
              else {
                stop();
              }
          }, SW_DELAI);
      };

      var stop = function () {
          $timeout.cancel(stopwatch);
          stopwatch = null;
          data.running = false;
      };

      var reset = function () {
          stop()
          data.value = 0;
      };

      var toggle = function () {
        if (data.running)
          stop();
        else
          start();
      };

      return {
          data: data,
          start: start,
          stop: stop,
          reset: reset,
          toggle: toggle
      };
  });

}());
