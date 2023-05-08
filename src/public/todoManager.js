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
                            <textarea onkeydown="keyDown(event, this.value, this)" disabled>${todos[i].NAME}</textarea>
                        </label>
                        <div class="edit-controller">
                            <i class="fa sharp fa-light fa-check deleteBtn" onclick="deleteTodo(${todos[i].ID})"></i>
                            <i class="fa fa-pencil editBtn"></i>
                        </div>
                    </div>
                     <div data-dbID="${todos[i].ID}" class="update-controller" style="display: none">
                           
                    </div>
                </div>`
    }
    document.querySelector(".todo-list").innerHTML = items;

    activateEditListener();
}

function keyDown(e, name, textarea) {
    if (e.keyCode === 13) { // enter
        updateTodo(name);
        e.preventDefault();
    }
    if (e.keyCode === 27) { // esc
        textarea.disabled = false;
    }
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
            inputs[i].focus();
            currentlyEditingTodoID = updateController[i].dataset.dbid;
        })
    })
}

window.addEventListener('load', () => {
    refreshTodos();
})