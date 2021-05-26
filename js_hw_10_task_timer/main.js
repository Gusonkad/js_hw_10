"use strict";

const TargetDate = new Date().getTime() + 1000 * 3600 * 48; // установить дату обратного отсчета

let days, hours, minutes, seconds;

const Countdown = document.getElementById("field-1");

getCountdown();
setInterval(() => {
    getCountdown();
}, 1000);
console.log('Start countdown');
function getCountdown() {
    const currentDate = new Date().getTime();
    let secondsLeft = (TargetDate - currentDate) / 1000;
    days = pad(parseInt(secondsLeft / 86400));
    secondsLeft = secondsLeft % 86400;
    hours = pad(parseInt(secondsLeft / 3600));
    secondsLeft = secondsLeft % 3600;
    minutes = pad(parseInt(secondsLeft / 60));
    seconds = pad(parseInt(secondsLeft % 60)); // строка обратного отсчета  + значение тега

    Countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
}

function pad(n) {
    return (n < 10 ? '0' : '') + n;
}