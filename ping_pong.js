let userpall = document.querySelector("#userpall");
let computerpall = document.querySelector("#computerpall");
let ball = document.querySelector("#ball")

userpall.style.marginLeft ='30px'
userpall.style.marginTop = '0px'
computerpall.style.marginLeft = '1048px'
computerpall.style.marginTop = '0px'
ball.style.marginLeft = '534px'
ball.style.marginTop = '262px'


let up_press=false //38 arrow up
let down_press=false //40 arrow down

let ID

let Vx = -1
let Vy = -1
let V =Math.sqrt(Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2)))
document.addEventListener('keydown',(e)=>{
    if(e.keyCode=='38'){
        up_press=true
    }else if(e.keyCode=='40'){
        down_press=true
    }
})

document.addEventListener('keyup',(e)=>{
    if(e.keyCode=='38'){
        up_press=false
    }else if(e.keyCode=='40'){
        down_press=false
    }
})

startplay()

/*
  clear the interval 
  reset margin left 
  margin top
  and value of velocity
  then start play ra7oob
*/
function reset(){
    new Audio('miss.mp3').play()
    clearInterval(ID)
    Vx=-1
    Vy=-1
    V=Math.sqrt(Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2)))
    ball.style.marginLeft='534px'
    ball.style.marginTop='262px'
   /* alert("Sorry Rehab you lost point");*/
   startplay()
   
}

// if W pressed marginTop will increase by 2
// if S pressed marginTop will increase by 2
function startplay(){
    setTimeout(()=>{
       ID= setInterval(() => {
            if(marginLeft(ball)<0){
                document.querySelector("#computer").innerHTML = Number(document.querySelector("#computer").innerHTML)+1 //هيزود سكور الكمبيوتر لو الكورة مخبطتش فى البادل بتاعتى:)
                if(Number(document.querySelector("#computer").innerHTML)==6)
                {
                    alert("computer Won")
                    Number(document.querySelector("#computer").innerHTML)=0;
                    Number(document.querySelector("#user").innerHTML)=0;
                   

                }
               
                reset()
                return
            }
            if((marginLeft(ball)+20)>1088)
            {
                document.querySelector("#user").innerHTML = Number(document.querySelector("#user").innerHTML)+1//هنا بقا الاسكور بتاعى اللى هيزيد
                if(Number(document.querySelector("#user").innerHTML)==6)
                {
                    alert("Yes You Won nice ra7oob")
                    Number(document.querySelector("#computer").innerHTML)=0;
                    Number(document.querySelector("#user").innerHTML)=0;
                }
                reset()
                return
            }
            if(marginTop(ball)<0 || (marginTop(ball)+20)>544){//container hight 544px and ball hight 20px
                new Audio('nothing.mp3').play()
                
                Vy=-Vy
            }
            let paddel=(marginLeft(ball)+10<544) ? userpall :computerpall

            if(collisionDetected(paddel)){
                new Audio('hit.mp3').play()
                let angle
                let type=(marginLeft(paddel)==30) ? 'user' :'comp'
                if(ball.centerY<paddel.centerY)
                {
                    angle=(type=='user' ? -Math.PI/4 : (-3*Math.PI)/4)
                }
                else if(ball.centerY>paddel.centerY){
                    angle=(type=='user' ? Math.PI/4 : (3*Math.PI)/4)
                }
                else if(ball.centerY==paddel.centerY)
                {
                    angle=(type=='user' ? 0 : Math.PI)
                }
                V+=0.5
                Vx = V*Math.cos(angle)
                Vy =V*Math.sin(angle)

            }
            //for computer
            let computerlevel=0.1
            computerpall.style.marginTop = `${marginTop(computerpall)+((ball.centerY-(marginTop(computerpall)+36)))*computerlevel}px`


            ball.style.marginLeft =`${marginLeft(ball)+Vx}px`
            ball.style.marginTop= `${marginTop(ball)+Vy}px`
            if(up_press && marginTop(userpall)>0)
            {
                userpall.style.marginTop=`${marginTop(userpall)-2}px`
            }else if(down_press && marginTop(userpall)<472)
            {
                userpall.style.marginTop=`${marginTop(userpall)+2}px`
            }
            if(marginTop(computerpall)<0){
                computerpall.style.marginTop='0px'
            }
            else if(marginTop(computerpall)>472)
            {
                computerpall.style.marginTop='42px'
            }
        }, 5)
    },500)
}
//this function return the numerical value of marginTop or marginLeft property of any element passed to them as an parameter
function marginTop(element){
    return Number(element.style.marginTop.split('p')[0])
}
function marginLeft(element){
    return Number(element.style.marginLeft.split('p')[0])

}

function collisionDetected(paddel)
{
    ball.top = marginTop(ball)
    ball.bottom = marginTop(ball)+20
    ball.left=marginLeft(ball)
    ball.right=marginLeft(ball)+20
    ball.centerX=marginLeft(ball)+10
    ball.centerY=marginTop(ball)+10



    paddel.top=marginTop(paddel)
    paddel.bottom=marginTop(paddel)+72
    paddel.left=marginLeft(paddel)
    paddel.right=marginLeft(paddel)+10
    paddel.centerX=marginLeft(paddel)+5
    paddel.centerY=marginTop(paddel)+36
     
    let type = (marginLeft(paddel)==30) ? 'user' : 'comp'
    let flag=false
    if(type=='user' && Vx<0)
    {
        flag=true
    }
    else if(type=='comp' && Vx>0)
    {
        flag=true
    }

    return ball.left < paddel.right && ball.top <paddel.bottom && ball.right > paddel.left && ball.bottom > paddel.top && flag
}