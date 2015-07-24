(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
