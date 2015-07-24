(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        document.getElementById("sound").play();
        alert("Alarm : " + trigger.label);
    }
    clockDiv.innerText = hours + ":" + minutes + ":" + seconds;
}
function init() {
    var state = "clock";
    var settingsButton = document.getElementById("settings");
    settingsButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (state === "clock") {
            document.getElementById("clock").style.display = "none";
            document.getElementById("alarm-settings").style.display = "block";
            document.getElementById("button").innerText = "done";
            state = "settings";
        }
        else {
            changeSettings();
            document.getElementById("clock").style.display = "block";
            document.getElementById("alarm-settings").style.display = "none";
            document.getElementById("button").innerText = "settings";
            state = "clock";
        }
    });
}
function changeSettings() {
    trigger.label = document.getElementById("label").value;
    trigger.hours = parseInt(document.getElementById("hours").value);
    trigger.minutes = parseInt(document.getElementById("minutes").value);
    trigger.seconds = parseInt(document.getElementById("seconds").value);
}
var trigger = { label: undefined, hours: undefined, minutes: undefined, seconds: undefined };
init();
setInterval(time, 1000);

},{}]},{},[1]);
