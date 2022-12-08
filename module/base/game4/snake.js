var speed = 2;
var Time = 1000 / speed;
var snakeDimention = [{ x: 11, y: 11 }];
var input = { x: 0, y: 0 };
var tid;
var score = 0;
var snakboard = document.getElementById("snakeBoard");
//get key code of keyboard
function getInputDirection() {
    window.addEventListener("keydown", function(e) {
        switch (e.code) {
            case "ArrowUp":
                if (input.x == 1) break;
                input = { x: -1, y: 0 };
                break;
            case "ArrowDown":
                if (input.x == -1) break;
                input = { x: 1, y: 0 };
                break;
            case "ArrowLeft":
                if (input.y == 1) break;
                input = { x: 0, y: -1 };
                break;
            case "ArrowRight":
                if (input.y == -1) break;
                input = { x: 0, y: 1 };
                break;
        }
    });
    return input;
}
// update dimention of snake
function update() {
    if (checkIfGameOver(snakeDimention[0].x, snakeDimention[0].y)) {
        //if snake dimention is not equal to the border of the page
        var getin = getInputDirection();
        for (
            let i = snakeDimention.length - 2; i >= 0; i-- //update snake dimention every one is equal to the previous one except the first one
        ) {
            snakeDimention[i + 1] = {...snakeDimention[i] };
        }
        snakeDimention[0].x += getin.x;
        snakeDimention[0].y += getin.y;
        if (updateFood(snakeDimention[0].x, snakeDimention[0].y)) {
            //if snake first dimention is equal to the food dimention
            snakeDimention[snakeDimention.length] = {
                ...snakeDimention[snakeDimention.length - 1],
            };
            speed += 0.25; // speed up
            Time = 1000 / speed;
            score++;
            clearInterval(tid); //to reset time interval with a new speed
            main();
        }
    } //if gameover
    else {
        snakboard.remove();
        var header = document.getElementById("header");
        header.style.margin = "0px";
        var d = document.createElement("div");
        document.body.appendChild(d);
        var h = document.createElement("h1");
        var ht = document.createTextNode("Game Over");
        h.appendChild(ht);
        h.style.color = "#fffcf2";
        d.appendChild(h);
        //h2
        var h2 = document.createElement("h2");
        var ht2 = document.createTextNode("Your Score : " + score);
        h2.appendChild(ht2);
        h2.style.color = "#fffcf2";
        d.appendChild(h2);
        //
        var b = document.createElement("button");
        var t = document.createTextNode("Retry");
        b.appendChild(t);
        d.appendChild(b);
        clearInterval(tid);
        b.addEventListener(
            "click",
            (
                e //if click every thing will redefine again
            ) => {
                d.remove();
                var dn = document.createElement("div");
                dn.id = "snakeBoard";
                document.body.appendChild(dn);
                speed = 2;
                Time = 1000 / speed;
                snakeDimention = [{ x: 11, y: 11 }];
                input = { x: 0, y: 0 };
                tid;
                score = 0;
                snakboard = document.getElementById("snakeBoard");
                reupload();
                main();
            }
        );
    }
}

function draw() {
    //to draw the snake
    snakboard.innerHTML = "";
    for (dim of snakeDimention) {
        var obj = document.createElement("div");
        obj.style.gridRowStart = dim.x;
        obj.style.gridColumnStart = dim.y;
        obj.classList.add("snake");
        snakboard.appendChild(obj);
    }
    drawfood();
}

function main() {
    tid = setInterval(function() {
        draw();
        update();
    }, Time);
}

function checkIfGameOver(x, y) {
    if (x <= 0 || x >= 21 || y <= 0 || y >= 21) {
        //page limit
        return false;
    }

    return 1;
}

function backk() {
    history.back();
}
main();