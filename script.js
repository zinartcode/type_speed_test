// Analog clock JS

const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var strarray = new Array("Every business has hundreds, if not thousands, of Internet-connected devices. While this Internet of Things, also called IoT, helps companies operate more effectively in changing eniroment, it also presents a far bigger security risk than many businesses realize.",
"What to do? Businesses need to understand that limiting risk goes far beyond protecting the devices themselves. To have effective security, companies also need to establish guidelines for how these devices are being used and the entire system in which they operate.",
"Develop a policy that illustrates everyone's role in cybersecurity. Users should be aware of risks and precautions required, such as when an employee uses a mobile phone to access confidential data in an airport. Revisit your technology operations on a regular basis",
 "It's important to understand how connected devices fit into your overall business strategy. Focus on what devices are being used, what benefits they provide and the potential risks they create. Also try to revisit your technology operations on a regular basis",
 "Many people use their own connected devices to work both inside and outside the office. Make sure your IT department has established policies to control and protect your network when these devices are being used. In addition, security controls should be monitored");

var date = new Date();
console.log(date);
let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
console.log("Hour: " + hr + " Minute: " + min + " Second: " + sec);

let hrPosition = (hr*360/12)+(min*(360/60)/12);
let minPosition = (min*360/60)+(sec*(360/60)/60);
let secPosition = sec*360/60;

function runTheClock() {

    hrPosition = hrPosition+(3/360);
    minPosition = minPosition+(6/60);
    secPosition = secPosition+6;

    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";

}

var interval = setInterval(runTheClock, 1000);

// Typing test JS

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const randText = document.querySelector("#rand-text").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
var interval;
var timerRunnig = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}
// Insert random text

function putstr() {
randomnum = Math.round(Math.random()*4);
 para = document.getElementById('rand-text');
//para = document.getElementById("#origin-text p");
para.innerHTML = strarray[randomnum];
}

window.onload = putstr()

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = para.innerHTML.substring(0,textEntered.length);
  //console.log(randText);
  //console.log(textEntered);

  if (textEntered == para.innerHTML) {
    clearInterval(interval);
    testWrapper.style.borderColor = "#429890";
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#65CCF3";
    } else {
      testWrapper.style.borderColor = "#E95D0F";
    }
  }
}

// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunnig) {
    timerRunnig = true;
    interval = setInterval(runTimer, 10);
  }
  console.log(textEnteredLength);
}

// Reset everything:
function reset() {
  putstr();
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunnig = false;

  testArea.value = "";
  theTimer.innerHTML - "00:00:00";
  testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
