(function () {
  'use strict';

  // create the angular app
  angular.module('StopwatchApp', ['StopwatchControllers', 'stopwatch', 'StopwatchFilters']);

  // set up dependency injection
  angular.module('StopwatchControllers', []);


  angular
  .module('stopwatch', [])
  .constant('TIMER_DELAY', 100)
  .constant('ALARM_DELAY', 4000)
  .factory('stopwatch', function (TIMER_DELAY,ALARM_DELAY,$timeout) {
      var data = { value: 0, running: true, messages: []};

      var stopwatchTimer = null;
      var alarmTimer = null;

      var addMessage = function(message) {
        var now = new moment();
        var newLine = now.format("HH:mm:ss") + ": " + message; 
        data.messages.push(newLine);
      };
          
      var start = function () {
        data.running = true;
        data.value--;
        stopwatchTimer = $timeout(function() {
          if (data.value == 0) {
            addMessage("Timer hit zero.")
            alarm();
          }
          start();
        }, TIMER_DELAY);
      };

      var stopTimer = function () {
        $timeout.cancel(stopwatchTimer);
        stopwatchTimer = null;
        data.running = false;        
      };

      var alarm = function () {
        var audio = new Audio('./media/alarm.wav');
        audio.play();
        alarmTimer = $timeout(function() {
          alarm();
        }, ALARM_DELAY);
      };

      var stopAlarm = function () {
        $timeout.cancel(alarmTimer);
        alarmTimer = null;
      };

      var stop = function () {
        stopTimer();
        stopAlarm();
      };

      var reset = function () {
        stop()
        data.value = 0;
      };

      var toggle = function () {
        if (data.running) {
          addMessage("Timer paused.");
          stop();
        }
        else {
          addMessage("Timer resumed.");
          start();
        }
      };

      var setTime = function (minutes) {
        addMessage("Timer started at " + minutes + " minutes.");
        data.value = minutes * 600;
        stopAlarm();
        start();
      };

      return {
          data: data,
          start: start,
          stop: stop,
          reset: reset,
          setTime: setTime,
          toggle: toggle
      };
  });

}());
