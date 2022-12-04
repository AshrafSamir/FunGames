const game1 = document.getElementById('game1');
const game2 = document.getElementById('game2');
const game3 = document.getElementById('game3');
const game4 = document.getElementById('game4');
const game5 = document.getElementById('game5');


game1.addEventListener('click' , function()
{
    //window.location.assign('base/game2/ping_pong.html');
    window.location.href="base/game2/ping_pong.html"
})
game2.addEventListener('click' , function()
{
    //window.location.assign('base/game2/ping_pong.html');
    window.location.href="base/game3/wordle.html"
})
game3.addEventListener('click' , function()
{
    //window.location.assign('base/game2/ping_pong.html');
    window.location.href="base/game4/snake.html"
})
game4.addEventListener('click' , function()
{
    //window.location.assign('base/game2/ping_pong.html');
    window.location.href="base/game5/breakout.html"
})
game5.addEventListener('click' , function()
{
    //window.location.assign('base/game2/ping_pong.html');
    window.location.href="base/game1/index.html"
})

const username = GetOneCookie('username');
const userWelcome = document.getElementById('wname');
userWelcome.textContent = 'Welcome ' + username;
console.log(GetOneCookie('username'));