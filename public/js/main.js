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

const init = (serverRoom, state, isOwner, playerIndex) => {
    header.classList.remove("hidden");
    document.body.appendChild(canvas);

    infoDiv.prepend(PLAYER_SPRITES[playerIndex]);

    roomIdTitle.textContent = `Id da sala: ${serverRoom}`;
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
        stateTitle.classList.add("waiting");
    } else if (newState === "running") {
        stateTitle.textContent = "Em andamento";
        stateTitle.classList.add("running");
    }
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
});

socket.on("player count", playersCount => {
    playerCountDiv.textContent = `<${playersCount}/4> jogadores`;
});