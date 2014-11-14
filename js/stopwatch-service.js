(function () {
  angular
  .module('stopwatch', [])
  .constant('TIMER_DELAY', 300)
  .constant('ALARM_DELAY', 4000)
  .factory('stopwatch', function (TIMER_DELAY,ALARM_DELAY,$timeout) {
      var data = { value: 0, running: true, isPositive: true, messages: [], symbol: "•"};

      var startTime = 0; // milliseconds since the epoch
      var lastPauseTime = 0; // milliseconds since the epoch
      var durationOfPreviousPauses = 0; // in milliseconds
      var duration = 0; // in milliseconds
      var wasPositive = false;
      var canToggle = false;

      var stopwatchTimer = null;
      var alarmTimer = null;

      var addMessage = function(message) {
        var now = new moment();
        var newLine = now.format("h:mm:ss.Sa") + ": " + message; 
        data.messages.push(newLine);
      };

      var currentTime = function () {
        var currentDate = new Date();
        return currentDate.getTime();
      };
          
      var runTimer = function () {
        data.running = true;

        var timeRemaining = startTime + totalTime + durationOfPreviousPauses - currentTime(); 
        data.value = timeRemaining;

        data.isPositive = (data.value >= 0);

        if (wasPositive && !data.isPositive) {
            addMessage("Timer hit zero.");
            alarm();          
        }
        wasPositive = data.isPositive;

        stopwatchTimer = $timeout(function() {
          runTimer();
        }, TIMER_DELAY);
      };

      var stopTimer = function () {
        $timeout.cancel(stopwatchTimer);
        stopwatchTimer = null;
        data.running = false;        
      };

      var alarm = function () {
        if (data.value < -300000) {
          return; // the alarm doesn't need to keep blaring after five minutes.
        }
        var audio = new Audio('./media/alarm.mp3');
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

      var clear = function () {
        data.symbol = "•";
        stop();
        data.value = 0;
        canToggle = false;
        data.messages = [];
        data.isPositive = true;
      };

      var toggle = function () {
        if (!canToggle)
          return;

        if (data.running) {
          data.symbol = "•";
          addMessage("Timer paused.");
          lastPauseTime = currentTime();
          stop();
        }
        else {
          data.symbol = "►";
          durationOfPreviousPauses += currentTime() - lastPauseTime;
          addMessage("Timer resumed.");
          runTimer();
        }
      };

      var start = function (minutes) {
        data.symbol = "►";
        canToggle = true;
        wasPositive = true;
        durationOfPreviousPauses = 0;
        addMessage("Timer started at " + minutes + " minutes.");
        startTime = currentTime();
        totalTime = minutes * 60000;
        stop();
        runTimer();
      };

      return {
          data: data,
          start: start,
          stop: stop,
          toggle: toggle,
          clear: clear
      };
  });
}());