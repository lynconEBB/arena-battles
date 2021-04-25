const Vector = require("./Vector.js");

class Player{
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.alive = true;
        this.width = 50;
        this.height = 30;
        this.rotation = 0;
        this.speed = 10;
        this.color = color;
        this.cursorPosition = {x: 0, y:0}
        this.movements = new Map();

        this.commands = {
            a: this.moveLeft.bind(this),
            w: this.moveUp.bind(this),
            s: this.moveDown.bind(this),
            d: this.moveRight.bind(this)
        };
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

    get vertices() {
        this.rotation = Math.atan2(this.cursorPosition.y - (this.y - this.height/2) , this.cursorPosition.x - this.x ) - (Math.PI/4);


        const vertices = [
            new Vector(this.x, this.y - this.height/2),
            new Vector(this.x - (this.width/2), this.y + this.height/2),
            new Vector(this.x + (this.width/2), this.y + this.height/2),
        ];

        for (let vertex of vertices) {
            vertex.translate(-this.x , -this.y );
            vertex.rotate(this.rotation);
            vertex.translate(this.x, this.y);
        }

        return vertices;
    }
}

module.exports = Player;