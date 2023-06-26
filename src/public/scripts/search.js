let searchInputField = document.querySelector("#searchInput");

let search_todosHeading_htmlElement = document.querySelector("#searchedTodosHeading");
let searchedTodos_htmlElement = document.querySelector(".searchedTodos");

let search_listsHeading_htmlElement = document.querySelector("#searchedListsHeading");
let searchedLists_htmlElement = document.querySelector(".searchedLists");


// ---------- DISPLAY TASKS AND LISTS IN SEARCH BOX  ----------
searchInputField.addEventListener("keyup", async () => {
    if (searchInputField.value === "") {
        searchBox.style.display = "none";
    } else {
        searchBox.style.display = "block";
    }

    // display searched Todos
    await getTodosWithOccurringLetters().then((resultTodos) => {
        search_todosHeading_htmlElement.style.display = "block"
        searchedTodos_htmlElement.innerHTML = "";
        resultTodos.forEach((currentTodo) => {
            searchedTodos_htmlElement.innerHTML += `<p onmousedown="getToSearchedTodo(${currentTodo.ID})" style="cursor: pointer">${currentTodo.NAME}</p>`;
        })
    });

    // display searched lists
    await getListsWithOccurringLetters().then((resultLists) => {
        search_listsHeading_htmlElement.style.display = "block";
        searchedLists_htmlElement.innerHTML = "";
        resultLists.forEach((currentList) => {
            searchedLists_htmlElement.innerHTML = `<p onmousedown="getToSearchedList(${currentList.ID})" style="cursor: pointer">${currentList.NAME}</p>`;
        })
    })
})


// ---------- GET ASKS AND LISTS ----------

// get tasks
// letters are saved in "searchInputField.value"
async function getTodosWithOccurringLetters() {
    let resultTodos = await fetch(`/api/search/getTodosWithOccurringLetters?letter=${searchInputField.value}&token=${sessionStorage.getItem(("userToken"))}`);
    return await resultTodos.json();
}

// get lists
async function getListsWithOccurringLetters() {
    let resultLists = await fetch(`/api/search/getListsWithOccurringLetters?letter=${searchInputField.value}&token=${sessionStorage.getItem(("userToken"))}`);
    return await resultLists.json();
}


// ---------- DISPLAY TASK OR LIST  ----------

// display task
async function getToSearchedTodo(id) {
    let resTodos = await fetch(`/api/search/getListIDFromSearchedTodo?id=${id}`);
    let listID = await resTodos.json();

    let resLists = await fetch(`/api/search/getSearchedListName?id=${listID[0].LISTID}`);
    let listName = await resLists.json();

    await getTodos(listID[0].LISTID);
    showTodos(listID[0].LISTID);
    setListName(listName[0].NAME);

    let todoElement = document.querySelector(`.todoID_${id}`);

    // yellow border (1.5 sek)
    todoElement.style.boxShadow = "0 0 1.5px 1.5px #F3E2A9";
    setTimeout(() => {
        todoElement.style.boxShadow = "none";
    }, 1500)
}

// display list
async function getToSearchedList(id) {
    let res = await fetch (`/api/search/getSearchedListName?id=${id}`);
    let listName = await res.json();

    await getTodos(id);

    let currentListElement =  document.querySelector(".currentList");

    // yellow border (1.5 sek)
    currentListElement.style.boxShadow = "0 0 1.5px 1.5px #F3E2A9";
    currentListElement.style.transition = "none";
    setTimeout(() => {
        currentListElement.style.boxShadow = "none";
    }, 1500)

    showTodos(id);
    setListName(listName[0].NAME)
}