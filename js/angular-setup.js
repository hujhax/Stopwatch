(function () {
  'use strict';

  // create the angular app
  angular.module('StopwatchApp', ['StopwatchControllers', 'stopwatch']);

  // set up dependency injection
  angular.module('StopwatchControllers', []);


  angular
  .module('stopwatch', [])
  .constant('SW_DELAI', 100)
  .factory('stopwatch', function (SW_DELAI,$timeout) {
      var data = { 
              value: 0
          },
          stopwatch = null;
          
      var start = function () {;
          stopwatch = $timeout(function() {
              if (data.value > 0) data.value--;
              start();
          }, SW_DELAI);
      };

      var stop = function () {
          $timeout.cancel(stopwatch);
          stopwatch = null;
      };

      var reset = function () {
          stop()
          data.value = 0;
      };

      return {
          data: data,
          start: start,
          stop: stop,
          reset: reset
      };
  });

}());
