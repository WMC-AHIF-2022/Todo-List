// check if the browser is firefox
function isFirefox() {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
        let userAgent = window.navigator.userAgent.toLowerCase();

        if (userAgent.indexOf('firefox') !== -1) {
            return true; // if the browser is firefox
        }
    }

    return false; // if the browser is not firefox
}

if (isFirefox()) {
    window.onload = function() {
        document.querySelector(".notCompatible").style.display = "block";
        document.querySelector(".notCompatible").textContent = "Not yet compatible with Firefox. Please try another browser";
        document.querySelector(".login-signup").style.display = "none";
    };
}
