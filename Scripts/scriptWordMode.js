const subMitBtnWordMode = document.getElementById("subMitBtnWordMode");
const word = document.getElementById("word");
const inputWordMode = document.getElementById("inputWordMode");
const keyImg = document.getElementById("keyImg");
const showKeyButton = document.getElementById("showKeyButton");
const revealLetterButton = document.getElementById("revealLetterButton");
const successSound = new Audio("../Sounds/success.mp3");
const failureSound = new Audio("../Sounds/failure.mp3");

let randomWord = "";
let keyVisible = false;

fetchWord();

subMitBtnWordMode.onclick = () => {
  guessWord();
};

showKeyButton.onclick = () => {
  revealKey();
}

revealLetterButton.onclick = () => {
  revealLetter();
}

async function fetchWord() {
  inputWordMode.focus();
  try {
    const response = await fetch("../words.json");
    const data = await response.json();
    const wordList = data.words;
    let randomIndex = Math.floor(Math.random() * wordList.length);
    randomWord = wordList[randomIndex];
    word.textContent = randomWord;
    console.log(randomWord);
    return randomWord;
  } catch {
    console.error("Kunde inte ladda JSON:", error);
  }
}


function guessWord(){
    let guessedWord = inputWordMode.value.trim().toLowerCase();
    if(guessedWord == randomWord){
      successSound.playbackRate = 1.5;
      successSound.play();
        fetchWord();
        inputWordMode.value = "";
    }
    else{
      failureSound.playbackRate = 2;
      failureSound.play();
         //Skaka
    document.body.classList.add("shake");
    
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 200);

    }
}

function revealKey(){
  if(!keyVisible){
    keyImg.style.display = "block";
     keyVisible = true;
  }
  else{
    keyImg.style.display = "none";
     keyVisible = false;
  }

}

function revealLetter(){
  let currentWord = word.textContent;
  let letters = currentWord.split("");
  let letterIndex = Math.floor(Math.random() * letters.length);
  letters[letterIndex] = `<span style="font-family: Arial, sans-serif;">${letters[letterIndex]}</span>`;
  word.innerHTML = letters.join("").trim(",");
} 