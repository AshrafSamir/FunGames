const dictionary = ['stand', 'place', 'store', 'cream', 'mouse', 'blind', 'arise'];
const word = dictionary[Math.floor(Math.random() * dictionary.length)];
const splited = word.split("");
var arr = [];
var Finall = [];
var Count = 1;
var i, j = 0;

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
        setCookie(Count);
        document.getElementById("h_score").innerHTML = "HIGH SCORE: " + getCookie();


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
function setCookie(Count) {
    if (document.cookie == '') {

        var date = new Date();
        date.setMonth(date.getMonth() + 1);
        document.cookie = "highScore=" + Count + ";expires=" + date;
    }

    var Sc = document.cookie.split("=")[1];
    if (Count <= Sc) {
        document.cookie = "highScore=" + Count + ";expires" + date;

    }
}

function getCookie() {
    var Sc = document.cookie.split("=")[1];
    return Sc
}

//Buttons
function TryAgain() {
    location.href = "wordle.html";
    //window.Score = getCookie();
}

function reset() {
    document.cookie = "highScore=" + Count + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";

}

//add events
for (i = 0; i < coll.length; i++) {
    coll[i].setAttribute("id", i + 1);
    coll[i].setAttribute("onkeyup", "moveNext(event,this.id)");

}

function moveNext(evt, ID) {

    if (evt.keyCode == 13) {
        document.getElementById(++ID).focus();
    }

}