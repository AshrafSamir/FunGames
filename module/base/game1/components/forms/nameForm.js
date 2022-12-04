let numberOfPlayers = 0;
let numberOfCards = 0;
let teams = [];

let slice1 = window.location.search.slice(1).split("&");
let slice2 = [];

for (let i = 0; i < slice1.length; i++) {
  slice2.push(slice1[i].split("="));
}

numberOfPlayers = slice2[0][1];
numberOfCards = slice2[1][1];
timePerTeam = window.location.search.slice(1).split("&")[2].split("=")[1];

function createForm() {
  let form = document.getElementById("form");
  for (let i = 0; i < numberOfPlayers; i++) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "input" + i);
    input.setAttribute("placeholder", "Player " + (i + 1));
    form.appendChild(input);
  }
  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", "button");
  button.setAttribute("onclick", "createTeams()");
  button.innerHTML = "Create Teams";
  form.appendChild(button);
}

function createTeams() {
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i += 2) {
    teams.push([inputs[i].value, inputs[i + 1].value]);
  }
  console.log(teams);
  console.log(window.location.href);
  let url =
    "fillCardForm.html?numberOfPlayers=" +
    numberOfPlayers +
    "&numberOfCards=" +
    numberOfCards +
    "&teams=" +
    teams +
    "&timePerTeam=" +
    timePerTeam;
  window.location.href = url;
}

createForm();
