import { ctx } from "./main.js";

export default class Player{
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 80;
        this.rotation = 0;
        this.speed = 5;
        this.color = color;
        this.movements = new Map();

        this.cursorPosition = {
            x: 0,
            y: 0
        };

        this.commands = {
            a: this.moveLeft.bind(this),
            w: this.moveUp.bind(this),
            s: this.moveDown.bind(this),
            d: this.moveRight.bind(this)
        };

        this.handleCursorMove = this.handleCursorMove.bind(this);
        addEventListener("mousemove",this.handleCursorMove);
    }

    handleCursorMove(event) {
        this.cursorPosition.x = event.clientX;
        this.cursorPosition.y = event.clientY;
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
        this.rotation = Math.atan2(this.cursorPosition.y - (this.y + this.height /2), this.cursorPosition.x - (this.x + this.width / 2));

        ctx.setTransform(1, 0, 0, 1, this.x, this.y);
        ctx.rotate(this.rotation + (90 * Math.PI/2));
        ctx.fillStyle = this.color;
        ctx.fillRect(-(this.width/2) , -(this.height/2), this.width,this.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.move();
    }
}