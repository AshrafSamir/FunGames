let topx = 2;
let leftx = 2;
const img = document.getElementById("img");

function createBricks() {
    for (let i = 0; i < 20; i++) {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = "45px";
        div.style.height = "20px";
        div.style.backgroundColor = "#eb5e28";
        //div.style.margin='1px';
        div.style.top = `${topx}px`;
        div.style.left = `${leftx}px`;
        div.classList.add("hittedd");
        leftx += 50;
        if (i == 9) {
            topx += 50;
            leftx = 2;
        }
        //node.appendChild(textnode);
        // if(i==19)
        // {
        container.appendChild(div);
        //  }
    }
    topx = 2;
    leftx = 2;
}

function startGame() {
    createBricks();
    const ball = document.getElementById("ball");
    console.log(
        getComputedStyle(ball).left,
        "     ",
        getComputedStyle(ball).right
    );
    const container = document.getElementById("container");

    const hit = document.getElementById("hit");
    hit.style.left = "150px";
    const hitted = document.getElementsByClassName("hittedd");
    console.log(hitted);

    let topBall = getComputedStyle(ball).top;
    let leftBall = getComputedStyle(ball).left;
    let hitedBall = getComputedStyle(hit).left;

    let rightBall = getComputedStyle(ball).right;
    let rightBallIntValue = parseInt(rightBall);

    let topBallIntValue = parseInt(topBall);
    let leftBallIntValue = parseInt(leftBall);
    let hitedBallValue = parseInt(hitedBall);

    let checkHeight = false;
    let checkWidth = false;
    let inter;

    //let topBall = ball.style.top;
    //ball.style.top = "200px"
    //console.log(topBallIntValue);
    inter = setInterval(function() {
        if (!checkHeight) {
            topBallIntValue++;
            ball.style.top = topBallIntValue + "px";
        } else if (checkHeight) {
            topBallIntValue--;
            ball.style.top = topBallIntValue + "px";
        }
        //////////////////////
        if (!checkWidth) {
            leftBallIntValue++;
            // console.log( getComputedStyle(ball).left , '     ',getComputedStyle(ball).right)

            ball.style.left = leftBallIntValue + "px";
        } else if (checkWidth) {
            leftBallIntValue--;
            ball.style.left = leftBallIntValue + "px";
        }
        /////////////////////////////
        if (topBallIntValue == 369) {
            if (
                hitedBallValue - 20 < leftBallIntValue &&
                hitedBallValue + 100 > leftBallIntValue
            ) {
                checkHeight = true;
                /*if(hitedBallValue<leftBallIntValue && hitedBallValue+50>leftBallIntValue)
                            {
                                checkWidth= true;
                            }
                            else if(hitedBallValue+100>leftBallIntValue && hitedBallValue+50<leftBallIntValue)
                            {
                                checkWidth=false; 
                            }*/
                console.log("left", hit.style.left);
                console.log("width", hit.style.width);
                console.log("hitedBallValue", hitedBallValue);
                console.log("leftBallIntValue", leftBallIntValue);

                console.log("hitted");
            } else {
                if (confirm("Restart or not")) {
                    ball.style.top = "200px";
                    ball.style.left = "0px";
                    //topBall = '200px';

                    // topBallIntValue = 200;
                    for (let i = 0; i < hitted.length; i++) {
                        hitted[i].remove();
                        // hitted[i].style.display = 'none';
                    }
                    //hitted.;
                    console.log(hitted);
                    clearInterval(inter);
                    startGame();
                } else {
                    img.classList.remove("d-none");
                    clearInterval(inter);
                    getPos(hitted);
                }
            }
            //if(hitedBallValue>)
            // console.log(hitedBallValue , 'hited')
            // console.log(leftBallIntValue , 'ball')

            // checkHeight = true
        } else if (topBallIntValue == 1) {
            checkHeight = false;
        } else if (topBallIntValue == 72) {
            //console.log('hit first row');
            //console.log(leftBallIntValue);
            for (let i = 0; i < hitted.length; i++) {
                //console.log(parseInt(getComputedStyle(hitted[i]).left))
                if (
                    hitted[i].style.display != "none" &&
                    parseInt(getComputedStyle(hitted[i]).top) == 52 &&
                    leftBallIntValue > parseInt(getComputedStyle(hitted[i]).left) &&
                    leftBallIntValue < parseInt(getComputedStyle(hitted[i]).left) + 50
                ) {
                    hitted[i].style.display = "none";
                    console.log("hit first row");
                    checkHeight = false;
                } else {
                    //checkHeight = true
                }
            }
            //if(leftBallIntValue> && leftBallIntValue< )
            //checkHeight = false
        } else if (topBallIntValue == 22) {
            //console.log('hit first row');
            //console.log(leftBallIntValue);
            for (let i = 0; i < hitted.length; i++) {
                //console.log(parseInt(getComputedStyle(hitted[i]).left))
                if (
                    hitted[i].style.display != "none" &&
                    parseInt(getComputedStyle(hitted[i]).top) == 2 &&
                    leftBallIntValue > parseInt(getComputedStyle(hitted[i]).left) &&
                    leftBallIntValue < parseInt(getComputedStyle(hitted[i]).left) + 50
                ) {
                    hitted[i].style.display = "none";
                    checkHeight = false;
                }

                //checkHeight = false
            }
        }

        let ckeckForEnd = 0;
        for (let i = 0; i < hitted.length; i++) {
            if (hitted[i].style.display == "none") {
                ckeckForEnd++;
            }
        }
        if (ckeckForEnd == hitted.length) {
            clearInterval(inter);

            for (let i = 0; i < hitted.length; i++) {
                hitted[i].remove();
            }
            if (confirm("new game or not")) {
                ball.style.top = "200px";
                ball.style.left = "0px";
                //topBall = '200px';

                // topBallIntValue = 200;
                for (let i = 0; i < hitted.length; i++) {
                    hitted[i].remove();
                    // hitted[i].style.display = 'none';
                }
                //hitted.;
                console.log(hitted);
                clearInterval(inter);
                startGame();
            } else {
                img.classList.remove("d-none");
                clearInterval(inter);
                getPos(hitted);
            }
            //startGame();
        }
        if (leftBallIntValue == 479) {
            checkWidth = true;
        } else if (leftBallIntValue == 1) {
            checkWidth = false;
        }
        for (let i = 0; i < hitted.length; i++) {
            //&& (parseInt(getComputedStyle(hitted[i]).right)==leftBallIntValue )
            // || parseInt(getComputedStyle(hitted[i]).left)== 500-parseInt(getComputedStyle(ball).right))
            if (
                hitted[i].style.display != "none" &&
                topBallIntValue > 2 &&
                topBallIntValue < 22 &&
                (parseInt(getComputedStyle(hitted[i]).left) ==
                    parseInt(getComputedStyle(ball).left) + 20 ||
                    parseInt(getComputedStyle(hitted[i]).left) + 52 ==
                    parseInt(getComputedStyle(ball).left))
            ) {
                // console.log(i+'  right div  ' +  parseInt(getComputedStyle(hitted[i]).right))
                console.log(
                    i + "  left div  " + parseInt(getComputedStyle(hitted[i]).left)
                );
                console.log(
                    i + "  right ball  " + parseInt(getComputedStyle(ball).right)
                );
                // console.log(i+'  left ball  ' + parseInt(getComputedStyle(ball).left))
                // console.log(i+'ball ' + leftBallIntValue)
                //hitted[i].style.display = "none";
                hitted[i].remove();
                checkWidth = !checkWidth;
            }
        }

        /*for(let i = 0 ; i<hitted.length ; i++)
                {
                    if(hitted[i].style.display=='')
                    {
    
                    }
                }*/
    }, 2);

    document.onkeydown = function(e) {
        e = e || window.event;

        if (e.keyCode == "39") {
            hitedBallValue += 10;
            if (hitedBallValue > 400) {
                hitedBallValue = 400;
            }
            hit.style.left = hitedBallValue + "px";
            //console.log(hitedBallValue)
        } else if (e.keyCode == "37") {
            hitedBallValue -= 10;
            if (hitedBallValue < 0) {
                hitedBallValue = 0;
            }
            hit.style.left = hitedBallValue + "px";
        }
    };
    /*for (let i = 0; i < hitted.length; i++) {
          console.log(parseInt(getComputedStyle(hitted[i]).top))
          //if(getComputedStyle(hitted[i]).top)
      }*/
}

//2+60+4 = 66
// 66+60= 126

function getPos(hitted) {
    for (let i = 0; i < hitted.length; i++) {
        console.log("left = ", hitted[i].style.left);
        console.log("right = ", hitted[i].style.right);

        //if(getComputedStyle(hitted[i]).top)
    }
}

function backk() {
    history.back();
}