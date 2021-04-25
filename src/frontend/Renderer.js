import { canvas } from "./main.js";

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
        this.ctx.beginPath();
        this.ctx.moveTo(vertices[0].x, vertices[0].y);
        this.ctx.lineTo(vertices[1].x, vertices[1].y);
        this.ctx.lineTo(vertices[2].x, vertices[2].y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    renderCircle(center) {
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    init() {
        this.render();
    }

    clear() {
        this.ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    render() {
        this.clear();

        for (let player of this.objects.players) {
            this.renderTriangle(player);
        }

        for (let bullet of this.objects.bullets) {
            this.renderCircle(bullet);
        }

        requestAnimationFrame(this.render);
    }
}