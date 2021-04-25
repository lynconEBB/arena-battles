import {Renderer} from "./Renderer.js";

export const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

let socket = io();

socket.on("server tick", data => {
    renderer.objects = data;
});

addEventListener("keydown", event => {
    socket.emit("key press", event.key);
});

addEventListener("keyup", event => {
    socket.emit("key up", event.key);
});

addEventListener("mousemove", event => {
    socket.emit("mouse move", {x: event.clientX, y: event.clientY});
});

const renderer = new Renderer(canvas);
renderer.init();