const createMatchButton = document.querySelector("#create-button");
const openDialogButton = document.querySelector("#open-button");
const dialog = document.querySelector(".dialog");
const closeDialogButton = document.querySelector("#close-button");
const enterMatchButton = document.querySelector("#enter-button");
const matchIdInput = document.querySelector("#match-id");

createMatchButton.addEventListener("click", () => {
    location.replace("/game?createMatch");
});

closeDialogButton.addEventListener("click", () => {
   dialog.classList.add("hidden");
});

openDialogButton.addEventListener("click", () => {
    dialog.classList.remove("hidden");
});

enterMatchButton.addEventListener("click", () => {
    location.replace(`/game?match=${matchIdInput.value}`)
});

