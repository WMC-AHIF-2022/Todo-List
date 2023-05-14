let lettersArr = [];

// TODO cmd+a does not work
function displaySearchedTodos(e) {
    currentListList = -1;
    if (e.key.match(/^(?:(?!\bShift|Meta|Tab|CapsLock|Escape\b).)*$/i)) {
        lettersArr.push(e.key);
    }
    if (e.key === "Backspace") {
        lettersArr.splice(lettersArr.length - 2, 2);
    }

    let letters = "";
    for (let currentLetter of lettersArr) {
        letters += currentLetter;
    }
    getTodosWithOccurringLetters(letters).then(result => {
        let editingHTMLElement = document.querySelector(".searchedTodos");

        editingHTMLElement.innerHTML = "";
        result.forEach((current) => {
            document.querySelector("#searchedTodosHeading").style.display = "block";
            editingHTMLElement.innerHTML += `<p>${current.NAME}</p>`;
        })
    });
    document.querySelector("#searchedTodosHeading").style.display = "none";

    getListsWithOccurringLetters(letters).then(result => {
        let editingHTMLElement = document.querySelector(".searchedLists");

        editingHTMLElement.innerHTML = "";
        result.forEach((current) => {
            document.querySelector("#searchedListsHeading").style.display = "block"
            editingHTMLElement.innerHTML += `<p>${current.NAME}</p>`;
        })
    });
    document.querySelector("#searchedListsHeading").style.display = "none";
}

async function getTodosWithOccurringLetters(letter) {
    let res = await fetch(`/api/search/getTodosWithOccurringLetters?letter=${letter}`);
    return await res.json();
}

async function getListsWithOccurringLetters(letter) {
    let res = await fetch(`/api/search/getListsWithOccurringLetters?letter=${letter}`);
    return await res.json();
}