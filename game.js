console.log("Game script ✅");

let cells = document.getElementsByClassName("grid__cell");
let random_cell;
let previous_cell;
let score = 0;
// let engine;
let timer;
let time = 10;
let timeoutVerif;
let good = document.getElementById("good");
let bad = document.getElementById("bad");
let music = document.getElementById("music");
let success = document.getElementById("sound--success");
let lose = document.getElementById("sound--lose");

let accuracy;
let missclick = 0;
let touchclick = 0;
let interval = 1000;

function launchGame() {
  launchTimer(time);
  nextCell();
  music.play();
  music.volume = 0.25;
  document.getElementById("grid").style.pointerEvents = "all";
}

document.getElementById("difficultySelector").addEventListener("change", difficultySelector);

function difficultySelector() {
  difficulty = document.getElementById("difficultySelector").value;
  console.log("difficulty : " + difficulty);
  switch (difficulty) {
    case "easy":
      time = 10;
      interval = 1250;
      console.log("ok easy");
      break;
    case "normal":
      time = 10;
      interval = 1000;
      console.log("ok medium");
      break;
    case "hard":
      time = 10;
      interval = 750;
      console.log("ok hard");
      break;
    case "hell":
      time = 10;
      interval = 500;
      console.log("ok hell");
      break;
    default:
      console.log("bug in difficulty switch");
      break;
  }
}

function launchTimer(time) {
  time = time;
  document.getElementById("timer").innerText = parseFloat(time.toFixed(1));
  timer = setInterval(function () {
    time = parseFloat(time.toFixed(1)) - 0.1;
    time = parseFloat(time.toFixed(1));
    // console.log(time);
    document.getElementById("timer").innerText = parseFloat(time.toFixed(1));
    if (time <= 0) {
      finished();
      clearInterval(timer);
    }
  }, 100);
}

function finished() {
  console.log("Finished");
  clearTimeout(timeoutVerif);
  document.getElementById("grid").style.pointerEvents = "none";
  music.pause();
  if (score > 0) {
    victory();
  } else {
    defeat();
  }
  // accuracyCalculator();
}

function defeat() {
  lose.play();
  document.getElementById("lose").style.display = "flex";
  document.getElementById("lose__score").innerText = score;
  document.getElementById("lose__accuracy").innerText = accuracyCalculator();
}
function victory() {
  success.play();
  document.getElementById("success").style.display = "flex";
  document.getElementById("success__score").innerText = score;
  document.getElementById("success__accuracy").innerText = accuracyCalculator();
}

function nextCell() {
  //   console.log("NEXT CELL");

  if (previous_cell || previous_cell == 0) {
    document.getElementsByClassName("grid__cell")[previous_cell].classList.remove("active");
    // console.log("Removed " + previous_cell + " cell");
  }
  random_cell = Math.round(Math.random() * (cells.length - 1) - 1) + 1;
  //   console.log("Random number : " + random_cell);

  document.getElementsByClassName("grid__cell")[random_cell].classList.add("active");
  previous_cell = random_cell;

  console.log(interval);
  timeoutVerif = setTimeout(function () {
    document.getElementsByClassName("grid__cell")[previous_cell].classList.remove("active");
    badCatch();
    nextCell();
  }, interval);
}

function badCatch() {
  //   console.log("nooo");
  updateScore("remove", 1);
  bad.play();
  // nextCell();
}

$(".grid__cell").on("click", function () {
  if ($(this).hasClass("active")) {
    // console.log("CATCH IT !");
    clearTimeout(timeoutVerif);
    nextCell();
    good.play();
    touchclick++;
    updateScore("add", 1);
  } else {
    // clearTimeout(timeoutVerif);
    badCatch();
    missclick++;
  }
});

function accuracyCalculator() {
  console.log("ACCURACY ##########");
  console.log("misslick : " + missclick);
  console.log("touchclick : " + touchclick);
  accuracy = Math.round((touchclick * 100) / (missclick + touchclick), 2) + "%";
  console.log("accuracy : " + accuracy);
  return accuracy;
}

function updateScore(action, amount) {
  //   console.log(action + " " + amount);
  switch (action) {
    case "add":
      score += amount;
      break;
    case "remove":
      score -= amount;
      break;
  }
  $("#score")[0].textContent = score;
}
