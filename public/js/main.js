import { Renderer } from "./Renderer.js";
import InputControls from "./controls.js";
import socket from "./socket.js";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
let roomId = "";
const stateTitle = document.querySelector("span");
const roomIdTitle = document.querySelector("h2");

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const inputControls = new InputControls(canvas);
const renderer = new Renderer(canvas);

if (getParameterByName("createMatch") !== null) {
    socket.emit("create room");

    socket.on("room created", () => {
        roomId = socket.id;
        roomIdTitle.textContent = `Id da sala: ${roomId}`;
        stateTitle.textContent = "Esperando";
        stateTitle.classList.add("waiting");
        renderer.init();
        inputControls.init();
    });

} else if (getParameterByName("match") !== null) {
    roomId = getParameterByName("match");

    socket.emit("enter room", roomId);

    socket.on("room entered", () => {
        roomIdTitle.textContent = `Id da sala: ${roomId}`;
        stateTitle.textContent = "Esperando";
        stateTitle.classList.add("waiting");
        renderer.init();
        inputControls.init();
    });
} else {


}