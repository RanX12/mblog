(function () {
  window.App = window.App || {};
  window.App.clock = {
    install: function () {
      this.clearIntervalTimer();
      let that = this;
      const requestUrl =
        "https://wttr.in/" +
        returnCitySN.cip +
        '?format="%l+\\+%c+\\+%t+\\+%h"';
      fetch(requestUrl)
        .then((city) => city.text())
        .then((city) => {
          that.createClockDoms(city);
        });
    },

    createClockDoms(city) {
      const electricClockDom = document.getElementById("electric-clock");
      if (electricClockDom) {
        var resList = city
          .replace(/not found/g, "not found,not found")
          .replace(/"/g, "")
          .replace(/\+/g, "")
          .replace(/,/g, "\\")
          .replace(/ /g, "")
          .replace(/°C/g, "");

        resList = resList.split("\\");

        clock_box_html = `
          <div class="clock-row">
            <span id="card-clock-clockdate" class="card-clock-clockdate"></span>
            <span class="card-clock-weather">${resList[2]} ${resList[3]} *C</span>
            <span class="card-clock-humidity">💧 ${resList[4]}</span>
          </div>
          <div class="clock-row">
            <span id="card-clock-time" class="card-clock-time"></span>
          </div>
          <div class="clock-row">
            <span class="card-clock-ip">${returnCitySN.cip}</span>
            <span class="card-clock-location">${resList[0]}</span>
            <span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>
          </div>
        `;

        document.getElementById("card-clock-loading").innerHTML = "";
        electricClockDom.innerHTML = clock_box_html;

        this.timer = setInterval(this.clock, 1e3);
        this.clock();
      }
    },

    clearIntervalTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },

    clock() {
      function processDate(c, e) {
        for (var t = "", n = 0; n < e; n++) t += "0";
        return (t + c).slice(-e);
      }

      const weekNumber = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      var morningOrAfternoon;
      var date = new Date();
      var currentHours =
        processDate(date.getHours(), 2) +
        ":" +
        processDate(date.getMinutes(), 2) +
        ":" +
        processDate(date.getSeconds(), 2);
      var currentYear =
        processDate(date.getFullYear(), 4) +
        "-" +
        processDate(date.getMonth() + 1, 2) +
        "-" +
        processDate(date.getDate(), 2) +
        " " +
        weekNumber[date.getDay()];
      var hour = date.getHours();

      if (
        hour > 12
          ? ((hour -= 12), (morningOrAfternoon = " PM"))
          : (morningOrAfternoon = " AM") &&
            document.getElementById("card-clock-time")
      ) {
        document.getElementById("card-clock-time").innerHTML = currentHours;
        document.getElementById("card-clock-clockdate").innerHTML = currentYear;
        document.getElementById(
          "card-clock-dackorlight"
        ).innerHTML = morningOrAfternoon;
      }
    },
  };
}.call(this));
