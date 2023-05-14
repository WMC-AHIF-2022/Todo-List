let todoInput = document.querySelector(".todoInput")
isClicked = false;

function showAndHideTodoInputField() {
    if (isClicked) {
        hideTodoInput();
    } else {
        showTodoInput();
    }
}

function showTodoInput() {
    todoInput.style.visibility = "visible";
    todoInput.style.opacity = "1";
    document.querySelector(".createNewTodo").innerHTML = "- create new Todo";
    this.isClicked = true;
}

function hideTodoInput() {
    todoInput.style.visibility = "hidden";
    todoInput.style.opacity = "0";
    document.querySelector(".createNewTodo").innerHTML = "+ create new Todo";
    this.isClicked = false;
}