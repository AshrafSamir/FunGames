let cards = window.location.search
  .slice(1)
  .split("&")[0]
  .split("=")[1]
  .slice(1, -1)
  .split(",");
let timePerTeam =
  window.location.search.slice(1).split("&")[1].split("=")[1] * 10;
let teams = window.location.search
  .slice(1)
  .split("&")[2]
  .split("=")[1]
  .split(",");

let playAgain = 0;
let phaseNumber = 1;
let points = [];
for (let i = 0; i < teams.length; i += 2) {
  points.push(0);
}
let timer = 0;
let i = 0;
let interval;
let cardNumber = Math.floor(Math.random() * cards.length);
let phase = document.createElement("h1");
let header = document.createElement("h2");
let player1 = document.createElement("h3");
let player2 = document.createElement("h3");
let cardDiv = document.getElementById("card");
let timerDiv = document.getElementById("timer");
let winnerDiv = document.getElementById("winner");
let gameDiv = document.getElementById("game");
let correctButton = document.getElementById("correctButton");

function nextTeam(i) {
  cards = cards.sort((a, b) => 0.5 - Math.random());
  if (i > teams.length) {
    i = 0;
  }
  player1.innerText = teams[i];
  player2.innerText = teams[i + 1];
  header.innerText = "Team " + (i / 2 + 1);
  phase.innerText = "Phase " + phaseNumber;
  document.body.appendChild(phase);
  document.body.appendChild(header);
  document.body.appendChild(player1);
  document.body.appendChild(player2);
}

function cardClick() {
  correctButton.style.display = "block";
  cardDiv.innerText = cards[cardNumber];
  interval = setTimeout(function again() {
    timer++;
    timerDiv.innerText = timer;
    interval = setTimeout(again, 1000);
    if (timer == timePerTeam) {
      clearTimeout(interval);
      timer = 0;
      i += 2;
      timerDiv.innerText = timer;
      cardDiv.innerText = "Click to start";
      correctButton.style.display = "none";
      alert("Time is up!");
      nextTeam(i);
    }
  }, 1000);
}

function correctGuess() {
  if (i > teams.length - 1) {
    i = 0;
  }

  points[i / 2] += 1;

  cards = cards.filter((_, index) => index != cardNumber);
  if (cards.length == 0) {
    if (phaseNumber == 3) phaseNumber++;
    nextPhase();
    return;
  }
  cardNumber = Math.floor(Math.random() * (cards.length - 1));
  cardDiv.innerText = cards[cardNumber];
}

function nextPhase() {
  if (phaseNumber < 3) phaseNumber++;
  if (phaseNumber == 2) {
    i = 0;
    timer = 0;
    player1.innerText = "";
    player2.innerText = "";
    header.innerText = "";
    phase.innerText = "";
    game.style.display = "none";
    correctButton.style.display = "none";
    clearTimeout(interval);
    declareWinner();
    setTimeout(function () {
      game.style.display = "block";
      timerDiv.innerText = timer;
      phase.innerText = "Phase 2";
      cardDiv.innerText = "Click to start";
      cards = window.location.search
        .slice(1)
        .split("&")[0]
        .split("=")[1]
        .slice(1, -1)
        .split(",");
      nextTeam(i);
    }, 1000);
  }
  if (phaseNumber == 3) {
    i = 0;
    timer = 0;
    player1.innerText = "";
    player2.innerText = "";
    header.innerText = "";
    phase.innerText = "";
    game.style.display = "none";
    correctButton.style.display = "none";
    clearTimeout(interval);
    declareWinner();
    setTimeout(function () {
      game.style.display = "block";
      timerDiv.innerText = timer;
      phase.innerText = "Phase 3";
      cardDiv.innerText = "Click to start";
      cards = window.location.search
        .slice(1)
        .split("&")[0]
        .split("=")[1]
        .slice(1, -1)
        .split(",");
      nextTeam(i);
    }, 1000);
  }
  if (phaseNumber == 4) {
    correctButton.style.display = "none";
    declareWinner();
    setTimeout(function () {
      window.location.assign("index.html");
    }, 2000);
  }
}

function declareWinner() {
  console.log(points);
  console.log(points.indexOf(Math.max(...points)));
  let winner = points.indexOf(Math.max(...points));
  alert("Team " + (winner + 1) + " wins! with " + points[winner] + " points!");
}

nextTeam(i);
