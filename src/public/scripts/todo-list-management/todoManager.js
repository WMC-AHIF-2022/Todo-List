let currentTodoID;
let currentListID;

let name_inputElement;
let date_inputElement;

let todos; // from db

function createTodoButtonPressed() {
    name_inputElement = document.querySelector("#newTodo");
    date_inputElement = document.querySelector("#newTodoDate");

    // check if input fields are not null
    if (checkInputFields()) {
        // check if date is valid
        if (checkDate(date_inputElement.value)) {
            // check if name does not start with ' ' (no empty string allowed)
            if (name_inputElement.value.startsWith(' ')) {
                alert("Name must not start with a space");
            } else {
                createTodo();
            }
        }
    }
}

// check if name of task and date are null
function checkInputFields() {
    if (date_inputElement.value && name_inputElement.value) {
        return true;
    }

    // if name is null
    if (name_inputElement.value) { // if date is null
        date_inputElement.style.border = "1.5px solid #F78181";
        setTimeout(() => {
            date_inputElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)"
        }, 1500);
        return false;
    }

    // if date is null
    if (date_inputElement.value) { // if name is null
        name_inputElement.style.border = "1.5px solid #F78181";
        setTimeout(() => {
            name_inputElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)"
        }, 1500);
        return false;
    }

    // is both are null
    date_inputElement.style.border = "1.5px solid #F78181";
    name_inputElement.style.border = "1.5px solid #F78181";
    setTimeout(() => {
        date_inputElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)"
        name_inputElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)"
    }, 1500);
    return false;
}

function displayTodos() {
    // add new item to html
    let displayedTodos = "";
    for (let i = 0; i < todos.length; i++) {
        displayedTodos += `<div class="item" style="margin-bottom: 10px;">
                    <div class="input-controller_todos" onclick="showTodoDetails(${todos[i].ID}, '${todos[i].NAME}', '${todos[i].DEADLINESTRING}')"> <!-- html element where the item is displayed -->
                    <div id="todosContainer" class="todoID_${todos[i].ID}"> 
                        <p id="todoDate">${todos[i].DEADLINESTRING}</p>
                        <label>
                            <textarea disabled>${todos[i].NAME}</textarea>
                        </label>
                    </div>
                        <div class="edit-controller_todos">
                            <i class="fa fa-duotone fa-check deleteBtn" style="transform: scale(0.9); top: calc(50% - 8px);" onclick="deleteTodo(${todos[i].ID})"></i>
                        </div>
                    </div>
                    <!-- when pencil was pressed -->
                    <div data-dbID="${todos[i].ID}" class="update-controller_todos" style="display: none"></div>
                </div>`
    }
    document.querySelector(".todos").innerHTML = displayedTodos;
}

function onKeyDown_todos(e, name, inputField) {
    if (e.keyCode === 13) { // enter
        updateTodo(name);
        inputField.disabled = true;
        e.preventDefault();
    }
    if (e.keyCode === 27) { // esc
        inputField.disabled = true;
        refreshTodos();
    }
}

// get todos after return is ready
function refreshTodos() {
    getTodos(currentListID).then(result => {
        displayTodos();
    })
}

async function getTodos(listID) {
    if (listID) {
        currentListID = listID;

        let res = await fetch(`/api/todos/getTodos?currentListID=${listID}`);
        const data = await res.json();
        todos = data; // set db rows to todos
        displayTodos();
        return data;
    }
}

async function createTodo() {
    await fetch("/api/todos/createTodo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "value": name_inputElement.value,
            "index": currentListID,
            "deadline": date_inputElement.value,
            "userID": sessionStorage.getItem("userID")
        }),
    })

    name_inputElement.value = "";
    date_inputElement.value = "";
    hideTodoInput(); // show-hide-todoInputField.js
    refreshTodos();
}

async function updateTodo(name) {
    await fetch("/api/todos/editTodo", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            value: name,
            index: currentTodoID
        }),
    }).catch((err) => {
        console.log(err.message);
    })
    refreshTodos();
}

// when edit button was pressed
function activateEditListener_todos() {
    const updateController = document.querySelector(".update-controller_todos");
    const inputField = document.querySelector("#todoDetailsName");

    hideTodoInput();
    hideListInput();

    inputField.disabled = false;
    inputField.focus();

    currentTodoID = updateController.dataset.dbid;
}


// ---------- delete todos ----------
async function deleteTodo(id) {
    await fetch("/api/todos/deleteTodo", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "index": id
        }),
    })
    hideTodoDetails();
    refreshTodos();
}

async function deleteAllTodosFromList(listId) {
    await fetch("/api/todos/deleteAllTodosFromList", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "index": listId
        }),
    })
    refreshTodos();
}