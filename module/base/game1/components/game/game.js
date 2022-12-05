// let cards = window.location.search
//   .slice(1)
//   .split("&")[0]
//   .split("=")[1]
//   .slice(0, -1)
//   .split(",");
let cards = localStorage.getItem("cards").split(",");
console.log(cards);

let timePerTeam =
  window.location.search.slice(1).split("&")[0].split("=")[1] * 60;
console.log(timePerTeam);
let teams = window.location.search
  .slice(1)
  .split("&")[1]
  .split("=")[1]
  .split(",");
console.log(teams);
let playAgain = 0;
let phaseNumber = 1;
let points = [];

for (let i = 0; i < teams.length; i += 2) {
  points.push(0);
}

let timer = 0;
let i = 0;
let interval;
let turn = [];
for (let i = 0; i < teams.length; i += 2) {
  turn.push(0);
}
let cardNumber = Math.floor(Math.random() * cards.length);

let phase = document.createElement("h1");
phase.setAttribute("id", "phase");
let header = document.createElement("h2");
header.setAttribute("id", "team");

let player1 = document.createElement("h3");
let player1Img = document.createElement("img");
player1Img.setAttribute("src", "../../assets/1.png");
player1Img.setAttribute("id", "player1Img");
player1.setAttribute("id", "player1");

let player2 = document.createElement("h3");
let player2Img = document.createElement("img");
player2Img.setAttribute("src", "../../assets/1.png");
player2Img.setAttribute("id", "player2Img");
player2.setAttribute("id", "player2");

// let turnEl = document.createElement("h3");
let turnImg = document.createElement("img");
turnImg.setAttribute("src", "../../assets/arrow.png");
turnImg.setAttribute("id", "turnImg");
// turnEl.innerText = "Your turn to perform!";
// turnEl.setAttribute("id", "turnElRight");

let cardDiv = document.getElementById("card");
let timerDiv = document.getElementById("timer");
let winnerDiv = document.getElementById("winner");
let gameDiv = document.getElementById("game");
let correctButton = document.getElementById("correctButton");
correctButton.setAttribute("id", "correctButton");

function switchTurn() {
  if (turn[i / 2] == 0) {
    turn[i / 2] = 1;
    //turnEl.setAttribute("id", "turnElLeft");
    turnImg.setAttribute("id", "turnImgLeft");
  } else if (turn[i / 2] == 1) {
    turn[i / 2] = 0;
    //turnEl.setAttribute("id", "turnElRight");
    turnImg.setAttribute("id", "turnImgRight");
  }
}

function nextTeam(i) {
  cards = cards.sort((a, b) => 0.5 - Math.random());
  interval = null;
  switchTurn();

  player1.innerText = teams[i];
  player2.innerText = teams[i + 1];
  header.innerText = "Team " + (i / 2 + 1);
  phase.innerText = "Phase " + phaseNumber;
  gameDiv.appendChild(phase);
  gameDiv.appendChild(header);
  gameDiv.appendChild(player1);
  gameDiv.appendChild(player1Img);
  gameDiv.appendChild(player2);
  gameDiv.appendChild(player2Img);
  // gameDiv.appendChild(turnEl);
  gameDiv.appendChild(turnImg);
}

function cardClick() {
  correctButton.style.display = "block";
  cardDiv.innerText = cards[cardNumber];
  if (!interval) {
    interval = setTimeout(function again() {
      timer++;
      timerDiv.innerText = timer;
      interval = setTimeout(again, 1000);
      if (timer == timePerTeam) {
        clearTimeout(interval);
        timer = 0;
        if (i == teams.length - 2) {
          i = 0;
        } else {
          i += 2;
        }

        timerDiv.innerText = timer;
        cardDiv.innerText = "Click to start";
        correctButton.style.display = "none";
        alert("Time is up!");
        nextTeam(i);
      }
    }, 1000);
  }
}

function correctGuess() {
  // if (i > teams.length - 1) {
  //   i = 0;
  // }

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
    correctButton.style.display = "none";
    clearTimeout(interval);
    declareWinner();
    setTimeout(function () {
      timerDiv.innerText = timer;
      phase.innerText = "Phase 2";
      cardDiv.innerText = "Click to start";
      cards = localStorage.getItem("cards").split(",");
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

    correctButton.style.display = "none";

    clearTimeout(interval);
    declareWinner();

    setTimeout(function () {
      timerDiv.innerText = timer;
      phase.innerText = "Phase 3";
      cardDiv.innerText = "Click to start";
      cards = localStorage.getItem("cards").split(",");
      nextTeam(i);
    }, 1000);
  }
  if (phaseNumber == 4) {
    correctButton.style.display = "none";
    declareWinner();
    // setTimeout(function () {
    //   window.location.href = "/components/forms/numberForm.html";
    // }, 2000);
  }
}

// function declareWinner() {
//   let winner = points.indexOf(Math.max(...points));
//   alert("Team " + (winner + 1) + " wins! with " + points[winner] + " points!");
// }

let winnerHeader = document.createElement("h2");
winnerHeader.setAttribute("id", "winnerHeader");

function declareWinner() {
  gameDiv.style.display = "none";
  winnerDiv.style.display = "flex";
  nextButton.style.display = "block";
  if (phaseNumber == 4) {
    nextButton.innerText = "Finish";
  }

  winnerHeader.innerText = "Phase " + (phaseNumber - 1) + " Results!";
  winnerDiv.appendChild(winnerHeader);

  for (let i = 0; i < points.length; i++) {
    let winner = document.createElement("h1");
    winner.innerText = "Team " + (i + 1) + " Scores: " + points[i] + " points.";
    winnerDiv.appendChild(winner);
  }
}

let nextButton = document.createElement("button");
nextButton.setAttribute("id", "nextButton");
nextButton.innerText = "Next";
nextButton.addEventListener("click", function () {
  if (phaseNumber == 4) {
    window.location.href = "../forms/numberForm.html";
  } else {
    winnerDiv.style.display = "none";
    gameDiv.style.display = "flex";
  }
});
nextButton.style.display = "none";
winnerDiv.appendChild(nextButton);

nextTeam(i);
