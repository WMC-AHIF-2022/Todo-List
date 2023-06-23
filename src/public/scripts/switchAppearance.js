let titleElement = document.querySelector(".title");
// lists
const listElement = document.querySelector(".lists");
const switchAppearanceButton= document.querySelector("#switchAppearanceButton");
const body = document.querySelector("body");
const createNewListElement = document.querySelector(".createNewList");
const listInputElement = document.querySelector(".listInput");
const newListInputFieldElement = document.querySelector("#newList");
// search
const searchInputElement = document.querySelector("#searchInput");
const searchLoup = document.querySelector(".searchLoup");
const searchedItemsElement = document.querySelector(".searchedItems");
const searchedTodosHeadingElement = document.querySelector("#searchedTodosHeading");
const searchedListsHeadingElement = document.querySelector("#searchedListsHeading");
// tasks
const currentListElement = document.querySelector(".currentList");
const listHeadingElement = document.querySelector("#listTitle");
const createNewTodoButtonElement = document.querySelector(".createNewTodo");
const todoInput_element = document.querySelector(".todoInput");
const todoName_element = document.querySelector("#newTodo");
const todoDate_element = document.querySelector("#newTodoDate");
// user dropdown
const dropdownContentElement = document.querySelector(".dropdown-content");
const switchAppearanceButtonElement = document.querySelector("#switchAppearanceButton");
// task details
const todoDetails_element = document.querySelector(".todoDetails");
const todoDetailsName_element = document.querySelector("#todoDetailsName");
const todoDetailsDate_element = document.querySelector("#todoDetailsDate-inputField");
const todoDetailsDescription_element = document.querySelector("#todoDetailsDescription");
const todoDetailsDescriptionHeading_element = document.querySelector("#todoDetailsDescriptionHeading");


let light = true;
sessionStorage.setItem("light", "true");

function switchAppearance() {
    if (light) {
        switchToDark()
        light = false;
        sessionStorage.setItem("light", "false");
    } else {
        switchToLight()
        light = true;
        sessionStorage.setItem("light", "true");
    }
}

function switchToDark() {
    switchAppearanceButton.innerHTML = "To Light";
    // background
    body.style.backgroundImage = "url('../img/Background_Dark.jpeg')";


    // ---------- LISTS ----------

    // list heading border
    titleElement.style.borderBottom = "1.5px solid rgba(192, 192, 192)"
    // lists background / font color
    listElement.style.backgroundColor = "rgba(36,36,36, 0.9)"
    body.style.color = "rgb(217,217,217)";

    createNewListElement.style.color = "rgb(217,217,217)";

    const allListElements = document.querySelectorAll(".input-controller-lists textarea");
    allListElements.forEach((current) => {
        current.style.background = "rgb(86, 92, 138, 0.9)";
        current.style.color = "white";
    })

    listInputElement.style.background = "rgba(36,36,36)"
    newListInputFieldElement.style.background = "rgba(0, 0, 0, 0.2)";

    // create new list
    createNewTodoButtonElement.style.color = "rgb(217,217,217)";
    newListInputFieldElement.style.border = "1.5px solid rgb(217,217,217, 0.8)";
    newListInputFieldElement.style.color = "rgb(217,217,217)";
    newListInputFieldElement.addEventListener("focus", () => {
        newListInputFieldElement.style.border = "1.5px solid rgba(86, 92, 138, 0.9)";
    })


    // ---------- TASKS ----------

    currentListElement.style.background = "rgba(36,36,36, 0.9)";
    listHeadingElement.style.borderBottom = "1.5px solid rgb(217,217,217)"

    const allTodoItems = document.querySelectorAll("#todosContainer");
    allTodoItems.forEach((current) => {
        current.style.background = "rgba(86, 92, 138, 0.9)";
    })

    const allTodoTextareaElements = document.querySelectorAll("#todosContainer textarea");
    allTodoTextareaElements.forEach((current) =>  {
        current.style.color = "rgba(171,171,171,0.53)";
    })

    // create new task
    todoInput_element.style.background = "rgba(36,36,36, 0.9)";
    todoName_element.style.background = "rgba(36,36,36)";
    todoName_element.style.border = "1.5px solid rgb(217,217,217, 0.8)";
    todoName_element.style.color = "rgb(217,217,217)";
    todoDate_element.style.background = "rgba(36,36,36)";
    todoDate_element.style.border = "1.5px solid rgb(217,217,217, 0.8)";
    todoDate_element.style.color = "rgb(217,217,217)";


    // ---------- TASK DETAILS ----------

    todoDetails_element.style.background = "rgba(36,36,36, 0.9)";
    todoDetailsName_element.style.webkitTextFillColor = "rgb(217,217,217)";
    todoDetailsDate_element.style.webkitTextFillColor = "rgb(217,217,217)";
    todoDetailsDescription_element.style.color = "rgb(217,217,217)";
    todoDetailsDescriptionHeading_element.style.borderBottom = "1.5px solid rgba(192, 192, 192)";
    todoDetailsDescription_element.style.background = "rgba(36,36,36)";
    todoDetailsDescription_element.style.border = "1.5px solid rgb(217,217,217, 0.8)";


    // ---------- SEARCH ----------

    searchInputElement.style.background = "rgba(36,36,36, 0.7)"
    searchInputElement.style.color = "rgb(217,217,217)";

    searchLoup.style.color = "black";

    searchedItemsElement.style.background = "rgba(36,36,36, 0.9)"
    searchedTodosHeadingElement.style.borderBottom = "1.5px solid rgba(192, 192, 192)";
    searchedListsHeadingElement.style.borderBottom = "1.5px solid rgba(192, 192, 192)";


    // ---------- DROPDOWN ----------

    dropdownContentElement.style.background = "rgba(36,36,36, 0.9)";
    switchAppearanceButtonElement.style.color = "rgb(217,217,217)";
    document.querySelector(".arrowDown").style.color = "black";
}

function switchToLight() {
    switchAppearanceButton.innerHTML = "To Dark";
    // background
    body.style.backgroundImage = "url('../img/Background.jpg')";


    // ---------- LISTS ----------

    // list heading border
    titleElement.style.borderBottom = "1.5px solid black"
    // lists background / font color
    listElement.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    body.style.color = "black";

    // create new list button
    createNewListElement.style.color = "black";

    // all list elements
    const allListElements = document.querySelectorAll(".input-controller-lists textarea");
    allListElements.forEach((current) => {
        current.style.background = "rgb(163, 207, 255)";
        current.style.color = "black";
    })

    listInputElement.style.background = "rgba(255, 255, 255, 0.5)";
    newListInputFieldElement.style.background = "rgb(255, 255, 255, 0.5)";
    newListInputFieldElement.style.border = "1.5px solid rgb(255, 255, 255, 0.5)";
    newListInputFieldElement.style.color = "black";
    newListInputFieldElement.addEventListener("focus", () => {
        newListInputFieldElement.style.border = "1.5px solid rgb(155, 195, 248)";
    })


    // ---------- TASKS ----------

    currentListElement.style.background = "rgba(255, 255, 255, 0.3)";
    listHeadingElement.style.borderBottom = "1.5px solid black"

    const allTodoItems = document.querySelectorAll("#todosContainer");
    allTodoItems.forEach((current) => {
        current.style.background = "rgb(163, 207, 255)";
        current.style.color = "black";
    })

    const allTodoTextareaElements = document.querySelectorAll("#todosContainer textarea");
    allTodoTextareaElements.forEach((current) =>  {
        current.style.color = "black";
    })

    // create new task
    createNewTodoButtonElement.style.color = "black";

    // create new task
    todoInput_element.style.background = "rgba(255, 255, 255, 0.5)";
    todoName_element.style.background = "rgb(255, 255, 255, 0.5)";
    todoName_element.style.border = "1.5px solid rgb(255, 255, 255, 0.5)";
    todoName_element.style.color = "black";
    todoDate_element.style.background = "rgb(255, 255, 255, 0.5)";
    todoDate_element.style.border = "1.5px solid rgb(255, 255, 255, 0.5)";
    todoDate_element.style.color = "black";


    // ---------- TASK DETAILS ----------

    todoDetails_element.style.background = "rgba(255, 255, 255, 0.5)";
    todoDetailsName_element.style.webkitTextFillColor = "black";
    todoDetailsDate_element.style.webkitTextFillColor = "black";
    todoDetailsDescription_element.style.color = "black";
    todoDetailsDescriptionHeading_element.style.borderBottom = "1.5px solid black";
    todoDetailsDescription_element.style.background = "rgba(255, 255, 255, 0.5)";
    todoDetailsDescription_element.style.border = "1.5px solid rgb(255, 255, 255, 0.5)";


    // ---------- SEARCH ----------

    searchInputElement.style.background = "rgba(255, 255, 255, 0.3)";
    searchInputElement.style.color = "black";

    searchedItemsElement.style.background = "rgba(255, 255, 255, 0.3)";

    searchedTodosHeadingElement.style.borderBottom = "1.5px solid black";
    searchedListsHeadingElement.style.borderBottom = "1.5px solid black";


    // ---------- DROPDOWN ----------
    dropdownContentElement.style.background = "rgba(255, 255, 255, 0.3)";
    switchAppearanceButtonElement.style.color = "black";
}