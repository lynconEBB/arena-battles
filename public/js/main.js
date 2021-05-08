import { Renderer, PLAYER_SPRITES} from "./Renderer.js";
import InputControls from "./controls.js";
import socket from "./socket.js";

const canvas = document.createElement("canvas");
const stateTitle = document.querySelector("span");
const roomIdTitle = document.querySelector("h2");
const errorMessage = document.querySelector("#error-message");
const header = document.querySelector("header");
const infoDiv = document.querySelector("#info");
const playerCountDiv = document.querySelector("#info h1");
const winnerDiv = document.querySelector("#winner-message");
const winnerImg = document.querySelector("#winner-img");
const winnerText = document.querySelector("#winner-message h3");
const playButton = document.querySelector(".play-button");

const inputControls = new InputControls(canvas);
const renderer = new Renderer(canvas);

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const init = (roomId, state, isOwner, playerIndex) => {
    header.classList.remove("hidden");
    document.body.appendChild(canvas);

    infoDiv.prepend(PLAYER_SPRITES[playerIndex]);

    roomIdTitle.textContent = `Id da sala: ${roomId}`;
    changeState(state);

    if (isOwner) {
        playButton.addEventListener("click", () => {
            socket.emit("start game");
        });
        playButton.classList.remove("hidden");
    }

    renderer.init();
    inputControls.init();
}

const changeState = (newState) => {
    if (newState === "waiting") {
        stateTitle.textContent = "Aguardando";
    } else if (newState === "running") {
        canvas.style.display = "block";
        winnerDiv.classList.add("hidden");
        stateTitle.textContent = "Em andamento";
    } else if (newState === "eliminated") {
        stateTitle.textContent = "Eliminado";
    }
    stateTitle.className = newState;
}

if (getParameterByName("createMatch") !== null) {
    socket.emit("create room");

    socket.on("room created", init);

} else if (getParameterByName("match") !== null) {
    socket.emit("enter room", getParameterByName("match"));

    socket.on("room entered", init);

} else {
    errorMessage.classList.remove("hidden");
}

socket.on("error", () => {
    errorMessage.classList.remove("hidden");
    canvas.style.display = "none";
    header.style.display = "none";
});

socket.on("player count", playersCount => {
    playerCountDiv.textContent = `<${playersCount}/4> jogadores`;
});

socket.on("state change", changeState);

socket.on("game winner", winnerPlayer => {
    canvas.style.display = "none";
    winnerText.textContent = `O vencedor é o jogador ${winnerPlayer}!`;
    winnerImg.src = PLAYER_SPRITES[winnerPlayer].src;
    winnerDiv.classList.remove("hidden");
});
