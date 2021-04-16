import Player from "./Player.js";

const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.height = 1080;
canvas.width =1920 ;

const player = new Player(350 ,250,"green");

addEventListener("keydown", event => {
    player.movements.set(event.key, true);
});

addEventListener("keyup", event => {
    player.movements.delete(event.key);
});

const detectCollision = () => {

}

const render =  () =>  {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    player.render();
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
