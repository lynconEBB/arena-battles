import { ctx} from "./main.js";
import { cursor } from "./cursorPosition.js";
import {Vector} from "./Vector.js";

export default class Player{
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 80;
        this.rotation = -(10 * (Math.PI / 180));
        this.speed = 1;
        this.color = color;
        this.movements = new Map();

        this.commands = {
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
    }

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
    }

    render() {
        const [firstVertex, ...vertices] = this.vertices;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(firstVertex.x, firstVertex.y);

        for (let vertex of vertices) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.fill();
        this.move();
    }

    get vertices() {
        //this.rotation = Math.atan2(cursor.y - (this.y + this.height /2), cursor.x - (this.x + this.width / 2));

        const vertices = [
            new Vector(this.x,  this.y),
            new Vector(this.x, this.y + this.height),
            new Vector(this.x + this.width, this.y +  this.height),
            new Vector(this.x + this.width, this.y)
        ];

        for (let vertex of vertices) {
            vertex.translate(-(this.x + (this.width/2)), -(this.y + (this.height/2)));
            vertex.rotate(this.rotation);
            vertex.translate(this.x + (this.width/2), this.y + (this.height/2));
        }

        return vertices;
    }
}