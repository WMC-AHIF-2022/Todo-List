const detailsHTMLElement = document.querySelector(".todoDetails");
let isVisible = false;

function showHideTodoDetails() {
    if (isVisible) {
        hideTodoDetails();
        isVisible = false;
    } else {
        changeToshowTodoDetails();
        isVisible = true;
    }
}

function hideTodoDetails() {
    detailsHTMLElement.style.visibility = "hidden";
    detailsHTMLElement.style.opacity = "0";
}

function changeToshowTodoDetails() {
    hideTodoInput();
    hideListInput();

    detailsHTMLElement.style.visibility = "visible";
    detailsHTMLElement.style.opacity = "1";
}