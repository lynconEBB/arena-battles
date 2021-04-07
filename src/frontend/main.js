import Player from "./Player.js";

const socket = io();

const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.height = 500;
canvas.width = 700;

const player = new Player(2,2,0,"green");

addEventListener("keydown", event => {
    player.movements.set(event.key, true);
});

addEventListener("keyup", event => {
    player.movements.delete(event.key);
});

const render =  () =>  {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    player.render();
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

socket.on('chat message', (msg) => {
    console.log("AAA");
    let item = document.createElement('li');
    item.textContent = msg;
    window.scrollTo(0, document.body.scrollHeight);
});