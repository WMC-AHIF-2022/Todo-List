isClicked = false;

function showAndHideListInputField() {
    if (isClicked) {
        hideListInput();
    } else {
        showListInput();
    }
}

function showListInput() {
    document.querySelector(".listInput").style.display = "flex";
    document.querySelector(".createNewList").innerHTML = "- create new List";
    this.isClicked = true;
}

function hideListInput() {
    document.querySelector(".listInput").style.display = "none";
    document.querySelector(".createNewList").innerHTML = "+ create new List";
    this.isClicked = false;
}