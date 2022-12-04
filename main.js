
const userName = document.getElementById('uname')
const unameError = document.getElementById('unameError')
const password = document.getElementById('password')
const passwordError = document.getElementById('passwordError')
const submit = document.getElementById('submit')
const regex = new RegExp(/^[a-zA-Z1-9]{4,}$/);

let check1=false , check2=false;
submit.addEventListener('click' , function(){
   
    if(regex.test(userName.value))
    {
        unameError.classList.add('d-none');
        check1=false;
    }
    else
    {
        unameError.classList.remove('d-none');
        check1=true;
    }

    if(regex.test(password.value))
    {
        passwordError.classList.add('d-none');
        check2=false;
    }
    else
    {
        passwordError.classList.remove('d-none');
        check2=true;
    }

    if(!check1 && !check2)
    {
        setCookie('username', userName.value);
        window.location.href="module/index.html"
    }
})
