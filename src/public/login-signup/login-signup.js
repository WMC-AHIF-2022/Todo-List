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
    console.log("test")
    const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            "username": usernameField.value,
            "password": passwordField.value
        })
    })

    if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("userID", data.insertedId);
        sessionStorage.setItem("username", usernameField.value);

        window.location.href = "../index.html";
    }
}

async function login() {
    let res = await fetch(`/api/login?username=${usernameField.value}&password=${passwordField.value}`)

    if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("userID", data.currentID);
        sessionStorage.setItem("username", data.currentUsername);

        window.location.href="../index.html";
    } else {
        document.querySelector("#loginErrorText").innerText = "Invalid username or password."
    }
}