let currentlyEditingListID;
let htmlListInputItem;

document.querySelector("#enterList").addEventListener('click', () => {
    htmlListInputItem = document.querySelector("#newList");
    createList(htmlListInputItem);
})

function displayLists(lists) {
    // add new task to html
    let items = "";
    for (let i = 0; i < lists.length; i++) {
        items += `<div class="item">
                    <div class="input-controller-lists" style="transform: translateZ(0);">
                        <label>
                            <textarea onkeydown="keyDown(event, this.value, this)" disabled>${lists[i].NAME}</textarea>
                        </label>
                        <div class="edit-controller">
                            <i class="fa sharp fa-light fa-check deleteBtn" onclick="deleteList(${lists[i].ID})"></i>
                            <i class="fa fa-pencil editBtn"></i>
                        </div>
                    </div>
                     <div data-dbID="${lists[i].ID}" class="update-controller" style="display: none">
                           
                    </div>
                </div>`
    }
    document.querySelector(".lists-list").innerHTML = items;

    activateEditListener();
}

function keyDown(e, name, textarea) {
    if (e.keyCode === 13) { // enter
        updateList(name);
        e.preventDefault();
    }
    if (e.keyCode === 27) { // esc
        textarea.disabled = false;
    }
}

function refreshLists() {
    getLists().then(result => {
        displayLists(result);
    })
}

async function getLists() {
    let res = await fetch ("/api/getLists");
    return await res.json();
}

async function createList(data) {
    await fetch("/api/createList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "value": data.value,
        }),
    })

    this.value = "";
    hideListInput(); // showAndHideListInputField.js
    refreshLists();
}

async function updateList(name) {
    await fetch("/api/editList", {
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
    refreshLists();
}

async function deleteList(id) {
    await fetch("/api/deleteList", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "index": id
        }),
    })
    refreshLists();
}


// ---------- EVENT LISTENERS ----------

function activateEditListener() {
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller-lists textarea");

    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
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