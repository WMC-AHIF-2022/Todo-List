const itemsArr = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
console.log(itemsArr);

document.querySelector("#enter").addEventListener('click', () => {
    const item = document.querySelector("#item");
    createItem(item);
})

function displayItems() {
    let items = "";
    for (let i = 0; i < itemsArr.length; i++) {
        items += `<div class="item">
                    <div class="input-controller">
                        <label>
                            <textarea disabled>${itemsArr[i]}</textarea>
                        </label>
                        <div class="edit-controller">
                            <i class="fa sharp fa-light fa-check deleteBtn"></i>
                            <i class="fa fa-pencil editBtn"></i>
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".todo-list").innerHTML = items;

    activateDeleteListener();
    activateEditListener();
    activateSaveListener();
    activateCancelListener();
}

function activateDeleteListener() {
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((db, i) => {
        db.addEventListener('click', () => {
            deleteItem(i);
        })
    })
}

function activateEditListener() {
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
        })
    })
}

function activateSaveListener() {
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
        sb.addEventListener('click', () => {
            updateItem(inputs[i].value, i);
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

function updateItem(text, i) {
    itemsArr[i] = text;
    localStorage.setItem("items", JSON.stringify(itemsArr));
    location.reload();
}

function deleteItem(i) {
    itemsArr.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArr));
    location.reload();
}

function createItem(item) {
    itemsArr.push(item.value);
    localStorage.setItem("items", JSON.stringify(itemsArr));
    location.reload();
}

window.addEventListener('load', () => {
    displayItems();
})