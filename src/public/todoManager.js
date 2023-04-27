let currentlyEditingTodoID;
let htmlInputItem;
// when input is entered a new task is created
document.querySelector("#enter").addEventListener('click', () => {
    htmlInputItem = document.querySelector("#item");
    createTodo(htmlInputItem);
})

function displayItems(todos) {
    // add new task to html
    let items = "";
    for (let i = 0; i < todos.length; i++) {
        items += `<div class="item">
                    <div class="input-controller">
                        <label>
                            <textarea disabled>${todos[i].NAME}</textarea>
                        </label>
                        <div class="edit-controller">
                            <i class="fa sharp fa-light fa-check deleteBtn" onclick="deleteTodo(${todos[i].ID})"></i>
                            <i class="fa fa-pencil editBtn"></i>
                        </div>
                    </div>
                     <div data-dbID="${todos[i].ID}" class="update-controller" style="display: none">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".todo-list").innerHTML = items;

    activateEditListener();
    activateSaveListener();
    activateCancelListener();
}

// get todos after return is ready
function refreshTodos() {
    getTodos().then(result => {
        displayItems(result);
    })
}

async function getTodos() {
    let res = await fetch ("/api/getTodos");
    return await res.json();
}

async function createTodo(data) {
    await fetch("/api/createTodo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "value": data.value,
        }),
    })

    this.item.value = "";
    hideTodoInput(); // showHideTodoInputField.js

    refreshTodos();
}
async function updateTodo(name) { // TODO funktioniert noch nicht
    await fetch("/api/editTodo", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            value: name,
            index: currentlyEditingTodoID
        }),
    })
    refreshTodos();
}

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


// ---------- EVENT LISTENERS ----------

function activateEditListener() {
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
            currentlyEditingTodoID = updateController[i].dataset.dbID;
        })
    })
}
function activateSaveListener() {
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    const updateController = document.querySelectorAll(".update-controller");

    saveBtn.forEach((sb, i) => {
        sb.addEventListener('click', () => {
            updateTodo(inputs[i].value, i);
            updateController[i].style.display = "none";
        })
    })
}

function activateCancelListener() {
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

    cancelBtn.forEach((cb, i) => {
        cb.addEventListener('click', () => {
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
        })
    })
}

window.addEventListener('load', () => {
    refreshTodos();
})