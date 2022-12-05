var foodinput = { x: 0, y: 0 };
foodinput.x = Math.floor(Math.random() * 15);
foodinput.y = Math.floor(Math.random() * 15);
var foodboard = document.getElementById("snakeBoard");
function reupload() {
  foodinput = { x: 0, y: 0 };
  foodinput.x = Math.floor(Math.random() * 15);
  foodinput.y = Math.floor(Math.random() * 15);
  foodboard = document.getElementById("snakeBoard");
}
function updateFood(x, y) {
  if (foodinput.x == x && foodinput.y == y) {
    foodinput.x = Math.floor(Math.random() * 15);
    foodinput.y = Math.floor(Math.random() * 15);
    return 1;
  }
}
function drawfood() {
  var foodObj = document.createElement("div");
  foodObj.style.gridRowStart = foodinput.x;
  foodObj.style.gridColumnStart = foodinput.y;
  foodObj.classList.add("food");
  foodboard.appendChild(foodObj);
}
function food(input) {
  return 1;
}
