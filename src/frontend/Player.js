import {ctx} from "./main.js";

export default class Player{
    constructor(x, y, rotation, color) {
        this.x = x;
        this.y = y;
        this.rotation = 12;
        this.color = color;
        this.movements = new Map();

        this.commands = {
            a: this.moveLeft.bind(this),
            w: this.moveUp.bind(this),
            s: this.moveDown.bind(this),
            d: this.moveRight.bind(this)
        }

        this.lookAt()
    }

    lookAt() {
        addEventListener("mousemove",event => {
            this.rotation = Math.atan2(event.pageY - this.y + 15, event.pageX - this.x + 40);
            console.log(this.rotation);
        });
    }

    move() {
        this.movements.forEach(((value, key) => {
            this.commands[key]?.();
        }));
    }

    moveUp() {
        this.y -= 5;
    }

    moveDown() {
        this.y += 5;
    }

    moveRight() {
        this.x += 5;
    }

    moveLeft() {
        this.x -= 5;
    }

    render() {
        ctx.save();
        ctx.translate(this.x + 80, this.y + 30);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 80,30);
        this.move();
        ctx.restore();
    }
}