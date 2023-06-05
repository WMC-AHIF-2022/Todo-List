let currentlyEditingListID;
let htmlListInputItem_lists;
let currentListList;

document.querySelector("#enterList").addEventListener('click', () => {
    htmlListInputItem_lists = document.querySelector("#newList");
    createList(htmlListInputItem_lists);
})

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
                            <i class="fa-regular fa-trash deleteBtn" style="transform: scale(0.8)" onclick="deleteList(${lists[i].ID})"></i>
                            <i class="fa fa-pencil editBtn" style="transform: scale(0.8); margin-top: 2px;" onclick="activateEditListener_lists();"></i>
                        </div>
                    </div>
                     <div data-dbID="${lists[i].ID}" class="update-controller" style="display: none">
                           
                    </div>
                </div>`
    }
    document.querySelector(".lists-list").innerHTML = displayedLists;
}

// listName about todos
function setListName(listName) {
    hideTodoDetails();
    document.querySelector("#listTitle").innerText = listName;
}


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

function refreshLists() {
    getLists().then(result => {
        displayLists(result);
    })
}

async function getLists() {
    let res = await fetch (`/api/lists/getLists?accID=${sessionStorage.getItem("userID")}`);
    return await res.json();
}

async function createList(data) {
    await fetch("/api/lists/createList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "value": data.value,
            "accID": sessionStorage.getItem("userID")
        }),
    })

    data.value = "";
    hideListInput(); // show-hide-listInputField.js
    refreshLists();
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

async function checkIfTodosLeft(id) {
    let todosArr = await getTodos(id);
    if (todosArr.length !== 0) {
        if (confirm("There are still todos in the list. Delete anyway? ")) {
            await deleteAllTodosFromList(id);
        }
    }
}


// ---------- EVENT LISTENERS ----------

function activateEditListener_lists() {
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller-lists textarea");

    const editBtn = document.querySelectorAll(".editBtn");

    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            hideTodoDetails();
            hideTodoInput();
            hideListInput();

            updateController[i].style.display = "block";
            inputs[i].disabled = false;
            inputs[i].focus();

            currentlyEditingListID = updateController[i].dataset.dbid;
        })
    })
}

window.addEventListener('load', () => {
    refreshLists();
})