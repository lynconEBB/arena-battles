import socket from "./socket.js";

export default class InputControls {
    constructor(canvas) {
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
    }
}
