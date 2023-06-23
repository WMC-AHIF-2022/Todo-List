let currentTodoID;
let currentListID;

const name_inputElement= document.querySelector("#newTodo");
const date_inputElement = document.querySelector("#newTodoDate");

// all todos from current list (get from db)
let todos;


// ---------- CREATE NEW TASK ----------

// if enter was pressed
function onKeyDown_createTodo(e) {
    console.log("123")
    if (e.keyCode === 13) {
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
}

// if user pressed check to create new task
function createTodo_buttonPressed() {
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

// check if name of task and date are not null
function checkInputFields() {
    // if both are not null --> return true
    if (date_inputElement.value && name_inputElement.value) {
        return true;
    }

    // if date is null --> red border for 1.5 sek (return false)
    if (name_inputElement.value) {
        date_inputElement.style.border = "1.5px solid #F78181";
        setTimeout(() => {
            date_inputElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)"
        }, 1500);
        return false;
    }

    // if name is null --> red border for 1.5 sek (return false)
    if (date_inputElement.value) {
        name_inputElement.style.border = "1.5px solid #F78181";
        setTimeout(() => {
            name_inputElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)"
        }, 1500);
        return false;
    }

    // if both are null --> red border for 1.5 sek (return false)
    date_inputElement.style.border = "1.5px solid #F78181";
    name_inputElement.style.border = "1.5px solid #F78181";
    setTimeout(() => {
        date_inputElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)"
        name_inputElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)"
    }, 1500);
    return false;
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


// ---------- DISPLAY TASKS ----------

// get all tasks from current list
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

function displayTodos() {
    let displayedTodos = "";

    for (let i = 0; i < todos.length; i++) {
        displayedTodos += `<div class="item" style="margin-bottom: 10px;">
                    <div class="input-controller_todos" onclick="showTodoDetails(${todos[i].ID}, '${todos[i].NAME}', '${todos[i].DEADLINESTRING}')"> <!-- html element where the item is displayed -->
                   
                    <div id="todosContainer" class="todoID_${todos[i].ID}"> 
                        <!-- DATE -->
                        <p id="todoDate">${todos[i].DEADLINESTRING}</p>
                        <!-- NAME -->
                        <label>
                            <textarea disabled>${todos[i].NAME}</textarea>
                        </label>
                    </div>
                        <div class="edit-controller_todos">
                            <i class="fa fa-duotone fa-check deleteBtn" style="transform: scale(0.9); top: calc(50% - 8px);" onclick="deleteTodo(${todos[i].ID})"></i>
                        </div>
                    </div>

                    <div data-dbID="${todos[i].ID}" class="update-controller_todos" style="display: none"></div>
                </div>`
    }
    document.querySelector(".todos").innerHTML = displayedTodos;

    // switch appearance because otherwise task elements would not be changed
    if (sessionStorage.getItem("light") === "true") {
        switchToLight();
    } else {
        switchToDark();
    }
}

function refreshTodos() {
    getTodos(currentListID).then(result => {
        displayTodos();
    })
}


// ---------- EDIT TASK ----------

// if pencil was pressed
function activateEditListener_todos() {
    const updateController = document.querySelector(".update-controller_todos");
    const inputField = document.querySelector("#todoDetailsName");

    hideTodoInput();
    hideListInput();

    inputField.disabled = false;
    inputField.focus();

    currentTodoID = updateController.dataset.dbid;
}

// if textarea is enabled --> keypress enter or esc
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


// ---------- DELETE TASK ----------

// delete task with ID
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

// delete all todos with listID
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