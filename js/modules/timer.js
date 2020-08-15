function timer(id, deadLine) {

   function timeUntilEnd(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.round(t / 1000 / 60 / 60 / 24),
         hours = Math.round((t / 1000 / 60 / 60) % 24),
         minutes = Math.round((t / 1000 / 60) % 60),
         seconds = Math.round((t / 1000) % 60);
      return {
         remainingTime: t,
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds
      };
   }

   function plusZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setTimer(id, endtime) {
      const timer = document.querySelector(id),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timerUpdate = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = timeUntilEnd(endtime);
         days.innerHTML = plusZero(t.days);
         hours.innerHTML = plusZero(t.hours);
         minutes.innerHTML = plusZero(t.minutes);
         seconds.innerHTML = plusZero(t.seconds);

         // TODO: figure out why remainingTime < 0 and interval is cleared
         if (t.remainingTime <= 0) {
            clearInterval(timerUpdate);
         }
      }
   }
   setTimer(id, deadLine);
}

export default timer;