const userInput = document.getElementById("userInput");
const displayLetter = document.getElementById("letter");
const scoreDisplay = document.getElementById("scoreDisplay");
const streakDisplay = document.getElementById("streakDisplay");
const skipButton = document.getElementById("skipButton"); 
const timer = document.getElementById("timer"); 
const timerSwitchButton = document.getElementById("timerSwitch"); 

const letterList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "r",
  "s",
  "t",
  "u",
  "v",
  "x",
  "y",
  "z",
  "å",
  "ä",
  "ö",
];

let letter;
let score = 0;
let longestStreak = 0;
let startTime = 5;
let time = startTime;
let timerOn = true;
let intervalId;
reset();

skipButton.onclick = reset;

timerSwitchButton.onclick = timerSwitch;

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    console.log("Enter pressed!");
    guessLetter();
  }
});

function reset() {
  let randomIndex = Math.floor(Math.random() * letterList.length);

  time = startTime;
  timer.textContent = "Timer: " + time;

  letter = letterList[randomIndex];
  displayLetter.innerHTML = letter;
  userInput.value = "";
  document.body.style.backgroundColor = "aliceblue";
    displayLetter.style.color = "#333";
}

function guessLetter() {
  let guessedLetter = userInput.value.toLowerCase();

  if (guessedLetter === letter && time > 0) {
    reset();
    document.body.style.backgroundColor = "aliceblue";
    displayLetter.style.color = "#333";
    score++;
    scoreDisplay.innerHTML = "Score: " + score;
    if (score > longestStreak) {
      longestStreak++;
      streakDisplay.innerHTML = "Longest Streak: " + score;
    }
  } else {
    score = 0;
    document.body.style.backgroundColor = "#ff5757";
    displayLetter.style.color = "aliceblue";
    userInput.value = "";
    scoreDisplay.innerHTML = "Score: " + score;
  }
}

function countdown() {
  time--;
  timer.textContent = "Timer: " + time;

  if (time <= 0) {
    score = 0;
    scoreDisplay.innerHTML = "Score: " + score;
    document.body.style.backgroundColor = "#ff5757";
    displayLetter.style.color = "aliceblue";
    reset();
  }
}

intervalId = setInterval(countdown, 1000);

function timerSwitch(){
  if(timerOn){
    clearInterval(intervalId); // stop timer
    timerOn = false;
    timer.textContent = "";
  } else {
    time = 5;
    intervalId = setInterval(countdown, 1000);
    timerOn = true;
    timer.textContent = "Timer: " + time;
  }
}