let heading_loginSignup = document.getElementById("login-signup_heading");
let text_loginSignup = document.getElementById("noAccount");
let button_loginSignup = document.getElementById("loginSignupButton");
let login = true;

function changeLoginSignup() {
    if (login) {
        changeToSignup();
        login = false;
    } else {
        changeToLogin();
        login = true;
    }
}

function changeToSignup() {
    heading_loginSignup.innerHTML = "Signup";
    text_loginSignup.innerText = "Have an account";
    text_loginSignup.style.color = "darkgreen";
    button_loginSignup.innerHTML = "Signup";
}

function changeToLogin() {
    heading_loginSignup.innerHTML = "Login";
    text_loginSignup.innerText = "Don't have an account";
    text_loginSignup.style.color = "darkred";
    button_loginSignup.innerHTML = "Login";
}