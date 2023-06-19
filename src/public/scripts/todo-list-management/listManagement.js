let currentlyEditingListID;
let currentListList;

const newList_HTMLElement = document.querySelector("#newList");


// ---------- CREATE NEW LIST ----------

// when enter is pressed, a new list is created
function onKeyDown_createList(e) {
    if (newList_HTMLElement.value !== "") {
        if (e.keyCode === 13) {
            createList(newList_HTMLElement);
        }
    }
}

// when the check mark is pressed, a new list is created
document.querySelector("#enterList").addEventListener('click', () => {
    if (newList_HTMLElement.value !== "") {
        createList(newList_HTMLElement);
    }
})

async function createList(data) {
    const res = await fetch("/api/lists/createList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "value": data.value,
            "accID": sessionStorage.getItem("userID")
        }),
    })

    // if a list with this name does already exist
    if (res.status === 500) {
        alert("There is already a list with this name");
    }

    data.value = "";
    hideListInput(); // show-hide-listInputField.js
    refreshLists();
}


// ---------- DISPLAY LISTS ----------

// get all lists
async function getLists() {
    let res = await fetch (`/api/lists/getLists?accID=${sessionStorage.getItem("userID")}`);
    return await res.json();
}

function displayLists(lists) {
    // add new list to html
    let displayedLists = "";
    for (let i = 0; i < lists.length; i++) {
        displayedLists += `<div class="item">
                    <div class="input-controller-lists" onclick="getTodos(${lists[i].ID}); setListName('${lists[i].NAME}'); showHideTodos('${lists[i].ID}')" style="transform: translateZ(0);">
                        <label>
                            <textarea onkeydown="onKeyDown_lists(event, this.value, this)" disabled>${lists[i].NAME}</textarea>
                        </label>
                        
                        <div class="edit-controller">
                            <!-- DELETE -->
                            <i class="fa fa-trash deleteBtn" style="transform: scale(0.8)" onclick="deleteList(${lists[i].ID})"></i>
                            <!-- EDIT -->
                            <i class="fa fa-pencil editBtn" style="transform: scale(0.8); margin-top: 2px;" onclick="editList();"></i>
                        </div>
                    </div>
                     <div data-dbID="${lists[i].ID}" class="update-controller"/>                          
                </div>`
    }
    document.querySelector(".lists-list").innerHTML = displayedLists;
}

function refreshLists() {
    getLists().then(result => {
        displayLists(result);
    })
}


// ---------- DISPLAY TODOS ----------

// set the list name for the task element
function setListName(listName) {
    document.querySelector("#listTitle").innerText = listName;
}


// ---------- EDIT LIST ----------

// if pencil was pressed
function editList() {
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller-lists textarea");

    const editBtn = document.querySelectorAll(".editBtn");

    // iterate through all lists
    editBtn.forEach((eb, i) => {
        // if pencil was clicked
        eb.addEventListener('click', () => {
            hideTodoDetails();
            hideTodoInput();
            hideListInput();

            inputs[i].disabled = false;
            inputs[i].focus();

            currentlyEditingListID = updateController[i].dataset.dbid;
        })
    })
}

// if textarea is enabled --> keypress enter or esc
function onKeyDown_lists(e, name, textarea) {
    if (e.keyCode === 13) { // enter
        updateList(name);
        e.preventDefault();
    }
    if (e.keyCode === 27) { // esc
        textarea.disabled = true;
        refreshLists();
    }
}

async function updateList(name) {
    await fetch("/api/lists/editList", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            value: name,
            index: currentlyEditingListID
        }),
    }).catch((err) => {
        console.log(err.message);
    })
    setListName(name);
    refreshLists();
}


// ---------- DELETE LIST ----------

// check if todos are still stored in the list
// --> if yes, ask user if delete anyway
async function checkIfTodosLeft(id) {
    // get all todos
    let todosArr = await getTodos(id);
    if (todosArr.length !== 0) {
        if (confirm("There are still todos in the list. Delete anyway? ")) {
            await deleteAllTodosFromList(id);
        }
    }
}

// delete list with ID
async function deleteList(id) {
    await checkIfTodosLeft(id);

    await fetch("/api/lists/deleteList", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "index": id
        }),
    })

    refreshLists();
    hideTodos();
}


// ---------- EVENT LISTENERS ----------

window.addEventListener('load', () => {
    refreshLists();
})