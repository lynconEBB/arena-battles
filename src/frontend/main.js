import {Renderer} from "./Renderer.js";

export const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

let socket = io();

socket.on("server tick", data => {
    renderer.objects = data;
});

/*this.commands = {
    a: this.moveLeft.bind(this),
    w: this.moveUp.bind(this),
    s: this.moveDown.bind(this),
    d: this.moveRight.bind(this)
};

addEventListener("keydown", event => {
    this.movements.set(event.key, true);
});

addEventListener("keyup", event => {
    this.movements.delete(event.key);
});

move() {
    this.movements.forEach(((value, key) => {
        this.commands[key]?.();
    }));
}

moveUp() {
    this.y -= this.speed;
}

moveDown() {
    this.y += this.speed;
}

moveRight() {
    this.x += this.speed;
}

moveLeft() {
    this.x -= this.speed;
}*/

const renderer = new Renderer(canvas);
renderer.init();