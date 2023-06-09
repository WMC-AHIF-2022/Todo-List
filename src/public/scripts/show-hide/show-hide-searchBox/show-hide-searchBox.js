let searchInput = document.querySelector("#searchInput");
let searchBox = document.querySelector(".searchedItems");
searchInput.addEventListener('focus', () => {
    setTimeout(() => {
        searchBox.style.display = "block";
    }, 300)

    document.querySelector(".currentList").style.visibility = "hidden";
    document.querySelector(".currentList").style.opacity = "0";


    searchBox.style.visibility = "visible";
    searchBox.style.opacity = "1";
})

searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        searchBox.style.display = "none"
    }, 100);
})