const subMitBtnWordMode = document.getElementById("subMitBtnWordMode");
const word = document.getElementById("word");
const inputWordMode = document.getElementById("inputWordMode");

let randomWord = "";

fetchWord();
subMitBtnWordMode.onclick = () => {
  guessWord();
};

async function fetchWord() {
  try {
    const response = await fetch("words.json");
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
    let guessedWord = inputWordMode.value.toLowerCase();
    if(guessedWord == randomWord){
        fetchWord();
        inputWordMode.value = "";
    }
    else{
        document.body.style.backgroundColor = "#ff5757";
    }
}