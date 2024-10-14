const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


const body = document.querySelector("body");
// const userName = document.querySelector("#Uname");
const pwd = document.querySelector("#password");
const email = document.querySelector("#Email");
const pwdError = document.querySelector("#pwdError");
const emailError = document.querySelector("#emailError");
const userNameError = document.querySelector("#userError");
const errorDisplay = document.querySelector(".error");
const Form = document.querySelector("#form");

Form.addEventListener("submit",(event)=>{
    // const userLength = userName.value.length;
    // const validUser = userLength>=5 && userLength<=20;
    const pwdLength = pwd.value.length;
    const validPwd = pwdLength>=8;
    const emailValue = email.value;
    const validEmail = emailValue.includes("@") && emailValue.includes(".") && emailValue.indexOf("@") < emailValue.indexOf(".");
    const isValid = true;

    // userNameError.innerHTML = "";
    pwdError.innerHTML = "";
    emailError.innerHTML = "";
    
    // if(!validUser){
    //     userNameError.style.display = "block";
    //     userNameError.innerHTML = "Username must be between 5 and 20 characters.";
    //     isValid = false;
    // }
    if(!validEmail){
        emailError.style.display = "block";
        emailError.innerHTML = "Please enter a valid email address.";
        isValid = false;
    }
    if(!validPwd){
        emailError.style.display = "none";
        pwdError.style.display = "block";
        pwdError.innerHTML = "Password must be at least 8 characters long.";
        isValid = false;
    }
    if(!isValid){
        event.preventDefault();
    }
    else{
        login();
    }
});

function login(){
    // const user = userName.value;
    const pass = pwd.value;
    const mail = email.value;
    console.log("data added");
    // localStorage.setItem('username',user);
    localStorage.setItem('password',pass);
    localStorage.setItem('email',mail);
    setTimeout(()=>{
        window.location.href = 'index.html';
    },100);
}