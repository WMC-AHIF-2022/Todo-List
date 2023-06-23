let todoInput = document.querySelector(".todoInput")
isClicked = false;

function showHideTodoInputField() {
    if (isClicked) {
        hideTodoInput();
    } else {
        showTodoInput();
    }
}

function showTodoInput() {
    hideTodoDetails();

    todoInput.style.visibility = "visible";
    todoInput.style.opacity = "1";
    document.querySelector(".createNewTodo").innerHTML = "- create new Todo";
    this.isClicked = true;

    hideListInput();
}

function hideTodoInput() {
    todoInput.style.visibility = "hidden";
    todoInput.style.opacity = "0";
    document.querySelector(".createNewTodo").innerHTML = "+ create new Todo";
    this.isClicked = false;
}