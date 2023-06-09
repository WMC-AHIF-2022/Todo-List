let searchInputField = document.querySelector("#searchInput");

let search_todosHeading_htmlElement = document.querySelector("#searchedTodosHeading");
let searchedTodos_htmlElement = document.querySelector(".searchedTodos");

let search_listsHeading_htmlElement = document.querySelector("#searchedListsHeading");
let searchedLists_htmlElement = document.querySelector(".searchedLists");

// display todos and lists
searchInputField.addEventListener("keyup", async (e) => {
    // display searched Todos
    await getTodosWithOccurringLetters().then((resultTodos) => {
        search_todosHeading_htmlElement.style.display = "block"
        searchedTodos_htmlElement.innerHTML = "";
        resultTodos.forEach((currentTodo) => {
            searchedTodos_htmlElement.innerHTML += `<p onclick='goToTodo(${currentTodo.ID})' style="cursor: pointer">${currentTodo.NAME}</p>`;
        })
    });

    // display searched lists
    await getListsWithOccurringLetters().then((resultLists) => {
        search_listsHeading_htmlElement.style.display = "block";
        searchedLists_htmlElement.innerHTML = "";
        resultLists.forEach((currentList) => {
            searchedLists_htmlElement.innerHTML = `<p>${currentList.NAME}</p>`;
        })
    })
});

// letters are saved in "searchInputField.value"
async function getTodosWithOccurringLetters() {
    let resultTodos = await fetch(`/api/search/getTodosWithOccurringLetters?letter=${searchInputField.value}&userID=${sessionStorage.getItem(("userID"))}`);
    return await resultTodos.json();
}

async function getListsWithOccurringLetters() {
    let resultLists = await fetch(`/api/search/getListsWithOccurringLetters?letter=${searchInputField.value}&userID=${sessionStorage.getItem(("userID"))}`);
    return await resultLists.json();
}

function goToTodo(id) {
    console.log("test");
}