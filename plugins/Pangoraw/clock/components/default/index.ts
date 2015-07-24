function t() {
  var currentTime = new Date();
  var hours = currentTime.getHours().toString();
  var minutes = currentTime.getMinutes().toString();
  var seconds = currentTime.getSeconds().toString();

  var clockDiv = document.getElementById("clock");

  if (parseInt(hours) < 10) {
    hours = "0" + hours;
  }
  if (parseInt(minutes) < 10) {
    minutes = "0" + minutes;
  }
  if (parseInt(seconds) < 10) {
    seconds = "0" + seconds;
  }

  clockDiv.innerText = hours + ":" + minutes + ":" + seconds;
}

setInterval(t, 1000);
