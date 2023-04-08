isClicked = false;

function showHideTodoInputField() {
    if (isClicked) {
        hideTodoInput();
    } else {
        showTodoInput();
    }
}

function showTodoInput() {
    document.querySelector(".todoInput").style.display = "flex";
    document.querySelector(".createNewTodo").innerHTML = "- create new Todo";
    this.isClicked = true;
}

function hideTodoInput() {
    document.querySelector(".todoInput").style.display = "none";
    document.querySelector(".createNewTodo").innerHTML = "+ create new Todo";
    this.isClicked = false;
}