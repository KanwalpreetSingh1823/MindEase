

function mskPassword(password){
    return '*'.repeat(password.length);
}

document.addEventListener('DOMContentLoaded',()=>{
    const userName = localStorage.getItem('name');
    const pwd = localStorage.getItem('password');
    const email = localStorage.getItem('email');
    const maskedPwd = mskPassword(pwd);
    if(userName){
        document.getElementById("userNameDisplay").innerText = userName;
    }
    if(pwd){
        document.getElementById("pwdDisplay").innerText = maskedPwd;
    }
    if(email){
        document.getElementById("emailDisplay").innerText = email;
    }
})