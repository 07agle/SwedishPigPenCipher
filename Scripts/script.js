const userInput = document.getElementById("userInput");
const displayLetter = document.getElementById("letter");
const scoreDisplay = document.getElementById("scoreDisplay");
const streakDisplay = document.getElementById("streakDisplay");
const skipButton = document.getElementById("skipButton"); 
const timer = document.getElementById("timer"); 
const timerSwitchButton = document.getElementById("timerSwitch"); 

let letterMap = new Map([
  ["a", 1], ["b", 1], ["c", 1],  ["d", 1], ["e", 1], ["f", 1],
  ["g", 1], ["h", 1], ["i", 1],  ["j", 1], ["k", 1], ["l", 1],
  ["m", 1], ["n", 1], ["o", 1],  ["p", 1], ["r", 1], ["s", 1], 
  ["t", 1], ["u", 1],  ["v", 1], ["x", 1], ["y", 1], ["z", 1], 
  ["å", 1], ["ä", 1],  ["ö", 1], 
])

let letter;
let maxWeight = 10;
let letterArray = [];
let score = 0;
let longestStreak = 0;
let startTime = 5;
let time = startTime;
let timerOn = true;
let intervalId;


function generateArray(){
  letterArray = [];

  for(let [letter, weight] of letterMap){
    for(let i = 0; i < weight; i++){
      letterArray.push(letter);
    }
  }
  console.log(letterArray);
}

function getRandomLetter(){
  return letterArray[Math.floor(Math.random() * letterArray.length)];
}

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
  clearInterval(intervalId);
  generateArray();
  let random = getRandomLetter();

  time = startTime;
  timer.textContent = "Timer: " + time;

  letter = random;
  displayLetter.innerHTML = letter;
  userInput.value = "";
  document.body.style.backgroundColor = "aliceblue";
    displayLetter.style.color = "#333";
}

function guessLetter() {
  let guessedLetter = userInput.value.toLowerCase();

  if (guessedLetter === letter && time > 0) {
    let current = letterMap.get(letter);
    letterMap.set(letter, Math.max(1, current - 1));
    document.body.style.backgroundColor = "aliceblue";
    displayLetter.style.color = "#333";
    score++;
    scoreDisplay.innerHTML = "Score: " + score;
    if (score > longestStreak) {
      longestStreak = score;
      streakDisplay.innerHTML = "Longest Streak: " + longestStreak;
    }
    reset();
  } else {
    score = 0;
    let current = letterMap.get(letter);
    letterMap.set(letter, Math.min(maxWeight, current + 1));
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
    time = startTime;
    intervalId = setInterval(countdown, 1000);
    timerOn = true;
    timer.textContent = "Timer: " + time;
  }
}