let listInput = document.querySelector(".listInput");
isClicked = false;

function showHideListInputField() {
    console.log("test")
    if (isClicked) {
        hideListInput();
    } else {
        showListInput();
    }
}

function showListInput() {
    listInput.style.visibility = "visible";
    listInput.style.opacity = "1";
    document.querySelector(".createNewList").innerHTML = "- create new List";
    this.isClicked = true;

    hideTodoInput();
}

function hideListInput() {
    listInput.style.visibility = "hidden";
    listInput.style.opacity = "0";
    document.querySelector(".createNewList").innerHTML = "+ create new List";
    this.isClicked = false;
}