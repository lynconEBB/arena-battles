import Player from "./Player.js";
import {Bullet} from "./Bullet.js";

const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.height = 1080;
canvas.width =1920 ;

const player = new Player(350 ,250,"green");
const bullet = new Bullet(500, 500, 10);
const render =  () =>  {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    player.render();
    bullet.render();
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
