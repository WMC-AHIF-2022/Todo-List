const usernameField = document.querySelector("#usernameInput");
const passwordField = document.querySelector("#passwordInput");

function loginSignup(value) {
    if (value === "Signup") {
        signup()
    } else {
        login();
    }
}

async function signup() {
    if (checkInputFields()) {
        const res = await fetch("/api/loginSignup/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                "username": usernameField.value,
                "password": passwordField.value
            })
        })

        if (res.status === 500) {
            alert("Username does already exist");
        }

        if (res.ok) {
            const data = await res.json();
            sessionStorage.setItem("userID", data.insertedId);
            sessionStorage.setItem("username", usernameField.value);

            window.location.href = "../../index.html";
        }
    }
}

async function login() {
    if (checkInputFields()) {
        let res = await fetch(`/api/loginSignup/login?username=${usernameField.value}&password=${passwordField.value}`)

        if (res.ok) {
            const data = await res.json();
            sessionStorage.setItem("userID", data.currentID);
            sessionStorage.setItem("username", data.currentUsername);

            window.location.href = "../../index.html";
        } else {
            document.querySelector("#loginErrorText").innerText = "Invalid username or password."
        }
    }
}

// check if input fields are not null --> return false / return true
// check if input fields includes ' '
function checkInputFields() {
    if (usernameField.value && passwordField.value) {
        // if username / pwd includes ' ' --> return false
        if (usernameField.value.includes(' ') || passwordField.value.includes(' ')) {
            alert("No spaces are allowed in the username or password")
            return false;
        }
        return true;
    }

    // if passwordField is null
    if (usernameField.value) {
        passwordField.style.border = "1.5px solid #F78181";
        setTimeout(() => {
            passwordField.style.border = "1.5px solid rgb(255, 255, 255, 0.5)";
        }, 1500);
        return false;
    }

    // if usernameField is null
    if (passwordField.value) {
        usernameField.style.border = "1.5px solid #F78181";
        setTimeout(() => {
            usernameField.style.border = "1.5px solid rgb(255, 255, 255, 0.5)";
        }, 1500);
        return false;
    }

    // if both are null
    passwordField.style.border = "1.5px solid #F78181";
    usernameField.style.border = "1.5px solid #F78181";
    setTimeout(() => {
        passwordField.style.border = "1.5px solid rgb(255, 255, 255, 0.5)";
        usernameField.style.border = "1.5px solid rgb(255, 255, 255, 0.5)";
    }, 1500);
    return false;
}