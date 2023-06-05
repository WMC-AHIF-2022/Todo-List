let currentEditingTodoName;
let currentEditingTodoDeadline;

function showTodoDetails(id, name, deadline) {
    if (id === currentlyEditingTodoID) {
        showHideTodoDetails();
    }

    currentEditingTodoName = name;
    currentEditingTodoDeadline = deadline;
    currentlyEditingTodoID = id;

    document.querySelector("#todoDetailsName").innerHTML = name;
    document.querySelector("#todoDetailsDate").innerHTML = deadline;

    refreshTodoDetails();
}

function refreshTodoDetails() {
    getTodoByID(currentlyEditingTodoID).then(r => {
        if (r[0].DESCRIPTION) {
            document.querySelector("#todoDetailsDescription").value = `${r[0].DESCRIPTION}`;
        } else {
            document.querySelector("#todoDetailsDescription").value = "";
        }
    });
}

async function getTodoByID(id) {
    if (id) {
        let res = await fetch(`/api/getTodoByID?currentID=${id}`);
        return await res.json();
    }
}

async function updateTodoDescription(description) {
    console.log(currentlyEditingTodoID);

    await fetch("/api/editTodoDescription", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            value: description,
            index: currentlyEditingTodoID
        }),
    }).catch((err) => {
        console.log(err.message);
    })
}

function editTodoDescription() {
    document.querySelector(".editTodoDescription").addEventListener('click', () => {
        const todoDescriptionTextarea = document.querySelector("#todoDetailsDescription");

        todoDescriptionTextarea.disabled = false;
        todoDescriptionTextarea.focus();
    })
}

function onKeyDown_todoDetails(e, description, textarea) {
    if (e.keyCode === 13) {
        updateTodoDescription(description);
        e.preventDefault();
        textarea.disabled = true;

        refreshTodoDetails();
    }
    if (e.keyCode === 27) {
        textarea.disabled = true;

        refreshTodoDetails();
    }
}