let names = window.location.search
  .slice(1)
  .split("&")[2]
  .split("=")[1]
  .split(",");

let teams = [];

for (let i = 0; i < names.length; i += 2) {
  teams.push([names[i], names[i + 1]]);
}

let numberOfPlayers = window.location.search
  .slice(1)
  .split("&")[0]
  .split("=")[1];
let numberOfCards = window.location.search.slice(1).split("&")[1].split("=")[1];
let numberOfTeams = teams.length / 2;
let timePerTeam = window.location.search.slice(1).split("&")[3].split("=")[1];

let cards = [];
let newCards = [];
let card = "";
let playerNumber = 0;

function createForm() {
  let form = document.createElement("div");
  let header = document.createElement("h1");
  header.innerText = "Fill the cards";
  header.setAttribute("id", "header");
  form.appendChild(header);
  form.setAttribute("id", `form${playerNumber}`);
  document.body.appendChild(form);

  form = document.getElementById(`form${playerNumber}`);
  let label = document.createElement("label");
  label.innerHTML = "Player: " + names[playerNumber];
  form.appendChild(label);

  for (let i = 0; i < numberOfCards; i++) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "input" + playerNumber);
    input.setAttribute("placeholder", "Card " + (i + 1));
    form.appendChild(input);
  }

  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", "button");

  if (playerNumber == names.length - 1) {
    button.setAttribute("onclick", "createCards()");
    button.innerHTML = "Create Cards";
    if (document.getElementById(`form${playerNumber - 1}`)) {
      document.getElementById(`form${playerNumber - 1}`).style.display = "none";
    }
  } else {
    button.setAttribute("onclick", "createForm()");
    button.innerHTML = "Next Player";

    if (document.getElementById(`form${playerNumber - 1}`)) {
      document.getElementById(`form${playerNumber - 1}`).style.display = "none";
    }
  }

  playerNumber++;
  form.appendChild(button);
}

createForm();

function createCards() {
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    card += inputs[i].value + ",";
    newCards.push(inputs[i].value);
  }
  localStorage.setItem("cards", newCards);
  cards.push(card);
  card = "";
  let url = "../game/game.html?timePerTeam=" + timePerTeam + "&teams=" + teams;
  window.location.href = url;
}
