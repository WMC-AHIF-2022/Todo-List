let currentList = document.querySelector(".currentList");

function showAndHideTodos(listID) {
    if (listID == currentListList) {
        hideTodos();
        currentListList = -1;
    } else {
        showTodos();
        currentListList = listID;
    }
}

function hideTodos() {
    currentList.style.visibility = "hidden";
    currentList.style.opacity = "0";
}

function showTodos() {
    currentList.style.visibility = "visible";
    currentList.style.opacity = "1";
}