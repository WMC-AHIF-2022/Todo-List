let currentlyEditingTodoID;
let htmlInputItem_todos;
let currentListID;

let todos; // from db

// when input is entered a new task is created
function createTodoButtonPressed() {
    htmlInputItem_todos = document.querySelector("#newTodo");
    // when input is not null
    if (htmlInputItem_todos.value) {
        createTodo(htmlInputItem_todos);
    }
}

function displayTodos() {
    // add new item to html
    let displayedTodos = "";
    for (let i = 0; i < todos.length; i++) {
        displayedTodos += `<div class="item">
                    <div class="input-controller_todos"> <!-- html element where the item is displayed -->
                        <label>
                            <textarea onkeydown="onKeyDown_todos(event, this.value, this)" disabled>${todos[i].NAME}</textarea>
                        </label>
                        <div class="edit-controller_todos">
                            <i class="fa fa-duotone fa-check deleteBtn" style="transform: scale(0.9)" onclick="deleteTodo(${todos[i].ID})"></i>
                            <i class="fa fa-pencil editBtn_todos" style="transform: scale(0.8)" onclick="activateEditListener_todos();"></i>
                        </div>
                    </div>
                    <!-- when pencil was pressed -->
                    <div data-dbID="${todos[i].ID}" class="update-controller_todos" style="display: none"></div>
                </div>`
    }
    document.querySelector(".todos").innerHTML = displayedTodos;
}

function onKeyDown_todos(e, name, textarea) {
    if (e.keyCode === 13) { // enter
        updateTodo(name);
        e.preventDefault();
    }
    if (e.keyCode === 27) { // esc
        textarea.disabled = true;
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

        let res = await fetch(`/api/getTodos?currentListID=${listID}`);
        const data = await res.json();
        todos = data; // set db rows to todos

        displayTodos();
        return data;
    }
}

async function createTodo(data) {
    await fetch("/api/createTodo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "value": data.value,
            "index": currentListID
        }),
    })

    data.value = "";
    hideTodoInput(); // showAndHideTodoInputField.js
    refreshTodos();
}

async function updateTodo(name) {
    await fetch("/api/editTodo", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            value: name,
            index: currentlyEditingTodoID
        }),
    }).catch((err) => {
        console.log(err.message);
    })
    refreshTodos();
}


// ---------- delete todos ----------
async function deleteTodo(id) {
    await fetch("/api/deleteTodo", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "index": id
        }),
    })
    refreshTodos();
}

async function deleteAllTodosFromList(listId) {
    await fetch("/api/deleteAllTodosFromList", {
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


// when edit button was pressed
function activateEditListener_todos() {
    const updateController = document.querySelectorAll(".update-controller_todos");
    const inputs = document.querySelectorAll(".input-controller_todos textarea");

    const editBtn = document.querySelectorAll(".editBtn_todos");
    // check which edit button was pressed
    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
            inputs[i].focus();

            currentlyEditingTodoID = updateController[i].dataset.dbid;
        })
    })
}