const ball = document.getElementById('ball');
const hit = document.getElementById('hit');

let topBall = getComputedStyle(ball).top;
let leftBall = getComputedStyle(ball).left;
let hitedBall = getComputedStyle(hit).left;


let topBallIntValue=parseInt(topBall);
let leftBallIntValue=parseInt(leftBall);
let hitedBallValue=parseInt(hitedBall);

let checkHeight = false ;
let checkWidth = false ;



//let topBall = ball.style.top;
//ball.style.top = "200px"
//console.log(topBallIntValue);
setInterval(
    function () {
        if(!checkHeight )
        {
            topBallIntValue++;
            ball.style.top=topBallIntValue+"px";
        }
        else if(checkHeight)
        {
            topBallIntValue--;   
            ball.style.top=topBallIntValue+"px";
        }
        //////////////////////
        if(!checkWidth )
        {
            leftBallIntValue++;
            ball.style.left=leftBallIntValue+"px";
        }
        else if(checkWidth)
        {
            leftBallIntValue--;   
            ball.style.left=leftBallIntValue+"px";
        }
        /////////////////////////////
        if(topBallIntValue == 359)
        {
            if(hitedBallValue<leftBallIntValue && hitedBallValue+100>leftBallIntValue)
            {
                checkHeight = true
            } 
            else
            {
                alert('lose')
            }
            //if(hitedBallValue>)
           // console.log(hitedBallValue , 'hited')
           // console.log(leftBallIntValue , 'ball')

            
           // checkHeight = true
        }
        else if (topBallIntValue == 1)
        {
            checkHeight = false
        }
        if(leftBallIntValue == 479)
        {
            checkWidth = true

        }
        else if (leftBallIntValue == 1)
        {
            checkWidth = false
        }
    }, 10)


document.onkeydown = function (e) {

    e = e || window.event;

     if (e.keyCode == '39') {
        hitedBallValue+=10; 
        if(hitedBallValue>400)
        {
            hitedBallValue=400;
        }  
        hit.style.left=hitedBallValue+"px";
        //console.log(hitedBallValue)
    }
    else if (e.keyCode == '37') {
        hitedBallValue-=10;   
        if(hitedBallValue<0)
        {
            hitedBallValue=0;
        }  
        hit.style.left=hitedBallValue+"px";
    }

};
