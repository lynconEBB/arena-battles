import socket from "./socket.js";

const PLAYER_SPRITES = {
    1: new Image(),
    2: new Image(),
    3: new Image(),
    4: new Image(),
};
PLAYER_SPRITES["1"].src = "assets/ship1.png";
PLAYER_SPRITES["2"].src = "assets/ship2.png";
PLAYER_SPRITES["3"].src = "assets/ship3.png";
PLAYER_SPRITES["4"].src = "assets/ship4.png";

export class Renderer{

    constructor(canvas) {
        canvas.height = 576;
        canvas.width = 1024;
        this.canvas = canvas;
        this.objects = {
            players: [],
            bullets: []
        };
        this.ctx = canvas.getContext("2d");
        this.render = this.render.bind(this);

        socket.on("server tick", data => {
            this.objects = data;
        });
    }

    renderSprite(playerData) {
        this.ctx.save();
        this.ctx.translate(playerData.x, playerData.y);
        this.ctx.rotate(playerData.rotation);
        this.ctx.drawImage(PLAYER_SPRITES[playerData.spriteIndex], -30, -25, 60,50);
        this.ctx.restore();
    }

    renderCircle(center) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#45d9ff";
        this.ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    init() {
        this.render();
    }

    clear() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clear();

        for (let player of this.objects.players) {
            this.renderSprite(player);
        }

        for (let bullet of this.objects.bullets) {
            this.renderCircle(bullet);
        }

        requestAnimationFrame(this.render);
    }
}