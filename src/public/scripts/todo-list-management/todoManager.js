let currentlyEditingTodoID;
let htmlElement_todoName;
let htmlElement_todoDeadline;
let currentListID;

let todos; // from db

// when input is entered a new task is created
function createTodoButtonPressed() {
    htmlElement_todoName = document.querySelector("#newTodo");
    htmlElement_todoDeadline = document.querySelector("#newTodoDate");

    // when input is not null
    if (htmlElement_todoName.value && htmlElement_todoDeadline.value) {
        createTodo();
    }
}

function displayTodos() {
    // add new item to html
    let displayedTodos = "";
    for (let i = 0; i < todos.length; i++) {
        displayedTodos += `<div class="item" style="margin-bottom: 10px;">
                    <div class="input-controller_todos" onclick="showTodoDetails(${todos[i].ID}, '${todos[i].NAME}', '${todos[i].DEADLINESTRING}')"> <!-- html element where the item is displayed -->
                    <div id="todosContainer"> 
                        <p id="todoDate">${todos[i].DEADLINESTRING}</p>
                        <label>
                            <textarea onkeydown="onKeyDown_todos(event, this.value, this)" disabled>${todos[i].NAME}</textarea>
                        </label>
                    </div>
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
            "value": htmlElement_todoName.value,
            "index": currentListID,
            "deadline": htmlElement_todoDeadline.value
        }),
    })

    htmlElement_todoName.value = "";
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
            index: currentlyEditingTodoID
        }),
    }).catch((err) => {
        console.log(err.message);
    })
    refreshTodos();
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


// when edit button was pressed
function activateEditListener_todos() {
    const updateController = document.querySelectorAll(".update-controller_todos");
    const inputs = document.querySelectorAll(".input-controller_todos textarea");

    const editBtn = document.querySelectorAll(".editBtn_todos");
    // check which edit button was pressed
    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            hideTodoDetails();
            hideTodoInput();
            hideListInput();

            inputs[i].disabled = false;
            inputs[i].focus();

            currentlyEditingTodoID = updateController[i].dataset.dbid;
        })
    })
}