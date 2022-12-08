const dictionary = ['stand', 'place', 'store', 'cream', 'mouse', 'blind', 'arise'];
const word = dictionary[Math.floor(Math.random() * dictionary.length)];
const splited = word.split("");
var arr = [];
var arr_of_cookies = [];
var arr_of_cookiess = [];
var Finall = [];
var Count = 1;
var i, j = 0;
var flag = 0;

//defining colors:
const correct_orange = "#EB5E28";
const correct_light = "#CCC5B9";

//input collection
var coll = document.getElementsByTagName("input");


//Check entered word
function Checked() {

    arr = document.getElementsByName("char" + Count);
    for (j in splited) {
        for (i in arr) {
            if (arr[i].value == splited[j]) {
                if (j == i) {
                    arr[i].style.background = correct_orange;
                } else {
                    arr[i].style.background = correct_light;
                }
            }

        }

    }

    for (i = 0; i < 5; i++) {
        Finall[i] = arr[i].value;
    }
    Finall = Finall.join("");
    Correctt();
    Count++;
    if (Count == 7) {
        Wrong();
    }
}

//CHECK IF WORD IS CORRECT:
function Correctt() {
    if (Finall == word) {
        document.getElementById("display").innerHTML = "Congratulations!!";
        document.getElementById("score").innerHTML = "YOUR SCORE: " + Count;
        setCookie("highScore", Count);
        document.getElementById("h_score").innerHTML = "HIGH SCORE: " + getCookie("highScore");


        for (i = 0; i < coll.length; i++) {
            coll[i].disabled = true;
        }
    } else {
        Finall = [];
    }
}
//IF WORD IS WRONG
function Wrong() {
    document.getElementById("display").innerHTML = "Try Again :(";
}


//Cookies
function setCookie(cookieName, val) {
    let Existt = document.cookie.indexOf(cookieName + '=');

    if (Existt == -1) {

        var date = new Date();
        date.setMonth(date.getMonth() + 1);
        document.cookie = cookieName + "=" + val + ";expires=" + date;
    } else {
        if (val <= getCookie(cookieName)) {

            document.cookie = cookieName + "=" + val + ";expires" + date;

        }
    }
}

function GetAllCookie() {
    let cookies = document.cookie
    let arr1 = cookies.split(';');
    for (let i = 0; i < arr1.length; i++) {
        arr1[i] = arr1[i].split('=');
    }

    return arr1;
}

function getCookie(key) {
    let arr1 = GetAllCookie();
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][0].trim().includes(key)) {
            return arr1[i][1];
        }
    }
}

//Buttons
function TryAgain() {
    location.href = "wordle.html";

}

function reset() {
    document.cookie = "highScore=" + Count + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";

}

//add events
for (i = 0; i < coll.length; i++) {
    coll[i].setAttribute("id", i + 1);
    coll[i].setAttribute("onkeyup", "Move(event,this.id)");

}

function Move(evt, ID) {

    if (evt.keyCode == 13 || evt.keyCode == 39) {
        document.getElementById(++ID).focus();
    }
    if (evt.keyCode == 37) {
        document.getElementById(--ID).focus();
    }

}

function backk() {
    history.back();
}