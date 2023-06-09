let currentEditingTodoName;
let currentEditingTodoDeadline;

function showTodoDetails(id, name, deadline) {
    if (id === currentTodoID) {
        showHideTodoDetails();
    }

    currentEditingTodoName = name;
    currentEditingTodoDeadline = deadline;
    currentTodoID = id;

    document.querySelector("#todoDetailsName").innerHTML = name;
    document.querySelector("#todoDetailsDate-inputField").value = deadline;

    refreshTodoDetails();
}

function refreshTodoDetails() {
    getTodoByID(currentTodoID).then(r => {
        if (r[0].DESCRIPTION) {
            document.querySelector("#todoDetailsDescription").value = `${r[0].DESCRIPTION}`;
        } else {
            document.querySelector("#todoDetailsDescription").value = "";
        }
    });
}

async function getTodoByID(id) {
    if (id) {
        let res = await fetch(`/api/todos/getTodoByID?currentID=${id}`);
        return await res.json();
    }
}

async function updateTodoDescription(description) {
    await fetch("/api/todos/editTodoDescription", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            value: description,
            index: currentTodoID
        }),
    }).catch((err) => {
        console.log(err.message);
    })
}

async function updateDate_description(date) {
    await fetch("/api/todos/editTodoDate", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            date: date,
            index: currentTodoID
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

function editDate_description() {
    const todoDetailsDate = document.querySelector("#todoDetailsDate-inputField");

    todoDetailsDate.disabled = false;
    todoDetailsDate.focus();
}

function onKeyDown_dateDetails(e, date, textarea) {
    if (e.keyCode === 13) {
        if (checkDate(date)) {
            console.log(date);
            updateDate_description(date);
            textarea.disabled = true;
        }

        e.preventDefault();
        refreshTodos();
    }
    if (e.keyCode === 27) {
        textarea.disabled = true;
        refreshTodos();
    }
}

function checkDate(dateString) {
    // DD.MM.YYYY
    if (!dateString.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)) {
        alert("Invalid date format (DD.MM.YYYY)");
        return false;
    }

    let splitDate = dateString.split(".");
    let day = parseInt(splitDate[0], 10);
    let month = parseInt(splitDate[1], 10) - 1;
    let year = parseInt(splitDate[2], 10);

    let date = new Date(year, month, day);
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        alert("Not a valid date");
        return false;
    }

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
        alert("Date must be at least today");
        return false;
    }

    return true;
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