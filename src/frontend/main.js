import Player from "./Player.js";
import { Bullet } from "./Bullet.js";

export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);


const player = new Player(594 ,300,"green");
const bullet = new Bullet(500, 500, 10);

let socket = io();

socket.on("connection", () =>{
    console.log(socket);
});

const render =  () =>  {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    player.render();
    bullet.render();
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
