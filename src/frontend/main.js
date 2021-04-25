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
    let rect = canvas.getBoundingClientRect();
    socket.emit("mouse move", {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    });
});

addEventListener("mousedown", event => {
    let rect = canvas.getBoundingClientRect();
    socket.emit("shoot", {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    });
})

const renderer = new Renderer(canvas);
renderer.init();