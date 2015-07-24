function time() {
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

  if (parseInt(hours) == trigger.hours && parseInt(minutes) == trigger.minutes && parseInt(seconds) == trigger.seconds) {
    (<HTMLAudioElement>document.getElementById("sound")).play();
    alert("Alarm : " + trigger.label);
  }

  clockDiv.innerText = hours + ":" + minutes + ":" + seconds;
}

function init() {
  let state : string = "clock";
  let settingsButton = document.getElementById("settings");

  settingsButton.addEventListener("click", (e : Event) => {
    e.preventDefault();
    if (state === "clock") {
      document.getElementById("clock").style.display = "none";
      document.getElementById("alarm-settings").style.display = "block";
      document.getElementById("button").innerText = "done";
      state = "settings";
    } else {
      changeSettings();
      document.getElementById("clock").style.display = "block";
      document.getElementById("alarm-settings").style.display = "none";
      document.getElementById("button").innerText = "settings";
      state = "clock";
    }
  });
}

function changeSettings() {
  trigger.label = (<HTMLInputElement>document.getElementById("label")).value;
  trigger.hours = parseInt((<HTMLInputElement>document.getElementById("hours")).value);
  trigger.minutes = parseInt((<HTMLInputElement>document.getElementById("minutes")).value);
  trigger.seconds = parseInt((<HTMLInputElement>document.getElementById("seconds")).value);
}

var trigger : { label : string, hours : number, minutes : number, seconds : number } = { label : undefined, hours : undefined, minutes : undefined, seconds : undefined };

init();
setInterval(time, 1000);
