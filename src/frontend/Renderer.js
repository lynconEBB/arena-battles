import {canvas} from "./main.js";

export class Renderer{

    constructor(canvas) {
        canvas.height = 576;
        canvas.width = 1024;
        this.objects = {
            players: [],
            bullets: []
        };
        this.ctx = canvas.getContext("2d");
        this.render = this.render.bind(this);
    }

    renderTriangle(vertices) {
        //console.log(vertices);
        /*this.ctx.beginPath();
        this.ctx.arc(vertices[0].x, vertices[0].y, 50, 0, 2 * Math.PI);
        this.ctx.stroke();*/
        this.ctx.beginPath();
        this.ctx.moveTo(vertices[0].x, vertices[0].y);
        this.ctx.lineTo(vertices[1].x, vertices[1].y);
        this.ctx.lineTo(vertices[2].x, vertices[2].y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    renderCircle() {

    }

    renderBackground() {

    }

    init() {
        this.render();
    }

    render() {
        this.ctx.clearRect(0,0, canvas.width, canvas.height);

        for (let player of this.objects.players) {
            this.renderTriangle(player);
        }
        requestAnimationFrame(this.render);
    }
}