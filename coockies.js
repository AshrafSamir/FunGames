function setCookie(key , value)
{
    let date = new Date();
    date.setMonth(date.getMonth()+1);
    document.cookie =key+"="+value+";expires="+date;
}

function setCounter()
{
    if(!GetOneCookie('counter'))
    {
        setCookie('counter', 0);
    }
    else
    {
       let x =  Number(GetOneCookie('counter'));
       x++;
       setCookie('counter', x);
    }
}

/*setCookie('username' , 'ahmed');
setCookie('title' , 'ayman');
setCookie('address' , 'maadi');
setCookie('gender' , 'male');*/

function GetAllCookie()
{
    let cookies = document.cookie
    let cookiesWithoutSpacing = cookies.trim();
    let arr = cookiesWithoutSpacing.split(';');
    for(let i = 0 ; i<arr.length ; i++)
    {
        arr[i]=arr[i].split('=');
    }
    //console.log(arr);
    return arr ;
}
function GetOneCookie(key)
{
    let arr = GetAllCookie();
    //console.log(arr)
    for(let i = 0 ; i<arr.length ; i++)
    {
        if(arr[i][0].includes(key))
        {
            console.log(arr[i][0] , arr[i][1])
            return arr[i][1];
        }
    }
}
function deleteCookie(key)
{
    document.cookie =key+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}
//GetOneCookie('')
