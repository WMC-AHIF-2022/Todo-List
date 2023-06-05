function logout() {
    sessionStorage.clear();
    window.location.href = "../login-signup/login-signup.html";
}

window.addEventListener("load", () => {
    document.querySelector(".dropdown-btn").innerHTML = sessionStorage.getItem("username");
})