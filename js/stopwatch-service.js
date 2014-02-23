(function () {
  angular
  .module('stopwatch', [])
  .constant('TIMER_DELAY', 100)
  .constant('ALARM_DELAY', 4000)
  .factory('stopwatch', function (TIMER_DELAY,ALARM_DELAY,$timeout) {
      var data = { value: 0, running: true, isPositive: true, messages: []};

      var startTime = 0; // milliseconds since the epoch
      var duration = 0; // in milliseconds

      var stopwatchTimer = null;
      var alarmTimer = null;

      var addMessage = function(message) {
        var now = new moment();
        var newLine = now.format("HH:mm:ssa") + ": " + message; 
        data.messages.push(newLine);
      };

      var currentTime = function () {
        var currentDate = new Date();
        return currentDate.getTime();
      };
          
      var runTimer = function () {
        data.running = true;

        var timeRemaining = startTime + totalTime - currentTime(); 
        data.value = timeRemaining;

        data.isPositive = (data.value >= 0);

        stopwatchTimer = $timeout(function() {
          if (data.value == 0) {
            addMessage("Timer hit zero.")
            alarm();
          }
          runTimer();
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
          runTimer();
        }
      };

      var start = function (minutes) {
        addMessage("Timer started at " + minutes + " minutes.");
        startTime = currentTime();
        totalTime = minutes * 60000;
        stopAlarm();
        runTimer();
      };

      return {
          data: data,
          start: start,
          stop: stop,
          reset: reset,
          toggle: toggle
      };
  })
}());