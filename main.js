const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

// Setting Levels
const lvls = {
  "Easy": 10, // seconds
  "Normal": 7,
  "Hard": 5
};

let startButton = document.querySelector(".start");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let replay = document.querySelector(".replay");
let Time = 0;
let select = document.getElementById('select').value;

// Setting Level Name + Seconds + Score
timeLeftSpan.innerHTML = String(lvls["Easy"]);
secondsSpan.innerHTML = String(lvls["Easy"]);
scoreTotal.innerHTML = String(words.length);

function getValue(){
  select = document.getElementById('select').value;
  let LevelSeconds = lvls[select];
  secondsSpan.innerHTML = String(LevelSeconds);
  timeLeftSpan.innerHTML = String(LevelSeconds);
}

// Disable Paste Event
input.onpaste = function () {return false;}

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  input.value = '';
  genWords();
}

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove WordFrom Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = '';
  // Generate Words
  for (let i = 0; i < words.length; i++)
    upcomingWords.innerHTML += `<div>${words[i]}</div>`
  startPlay();
}

//disable options
function Disable(){
  document.querySelectorAll("#select option").forEach(opt => {
    opt.disabled = true;
  });
}

//Enable options
function Enable(){
  document.querySelectorAll("#select option").forEach(opt => {
    opt.disabled = false;
  });
}

function startPlay() {
  Disable();
  // document.getElementById('select').style.display = "none";
  timeLeftSpan.innerHTML = String(lvls[select]);
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0"||theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
      // Stop Timer
      Time = Time + (lvls[select] - timeLeftSpan.innerHTML);
      clearInterval(start);
      // Empty Input Field
      input.value = '';

      if (words.length > 0 &&timeLeftSpan.innerHTML !== "0") {
        // Increase Score
        scoreGot.innerHTML++;
        genWords();
      }
      else if((words.length > 0)&&timeLeftSpan.innerHTML === "0") {
        let span = document.createElement("span");
        span.className = 'bad';
        let spanText = document.createTextNode(`Game Over taken time: ${Time}`);
        replay.style.opacity='1'
        replay.disabled= false;
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        Enable();
      }
      else {
        let span = document.createElement("span");
        span.className = 'good';
        let spanText = document.createTextNode(`Congratz Taken Time: ${Time}`);
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        replay.style.opacity='1'
        replay.disabled= false;
        // Remove Upcoming Words Box
        upcomingWords.remove();
        Enable();
      }
    }

  }, 1000);
}

replay.onclick =()=>{
  Time = 0;
  finishMessage.innerHTML='';
  scoreGot.innerHTML='0';
  words.length=30;
  // secondsSpan.innerHTML = String(defaultLevelSeconds);
  timeLeftSpan.innerHTML = String(lvls[select]);
  scoreTotal.innerHTML = String(words.length);
  upcomingWords.innerHTML = '';
  for (let i = 0; i < words.length; i++)
    upcomingWords.innerHTML += `<div>${words[i]}</div>`
  genWords();
  input.focus();
  input.value = '';
  replay.style.opacity='0.5'
  replay.disabled= true;
}