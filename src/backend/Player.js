const Vector = require("./Vector.js");
const {testHitAABB} = require("./collision.js");


const PLAYER_INITIAL_POSITIONS = {
    1: {x: 512, y: 40},
    2: {x: 400, y: 512},
    3: {x: 300, y: 512},
    4: {x: 40, y: 512},
}

class Player{
    constructor(playerIndex) {
        this.x = PLAYER_INITIAL_POSITIONS[playerIndex].x;
        this.y = PLAYER_INITIAL_POSITIONS[playerIndex].y;
        this.sprite = playerIndex;
        this.width = 50;
        this.height = 30;
        this.rotation = Math.PI/2;
        this.speed = 5;
        this.cursorPosition = {x: 0, y:0};
        this.movements = new Map();

        this.commands = {
            a: this.moveLeft.bind(this),
            w: this.moveUp.bind(this),
            s: this.moveDown.bind(this),
            d: this.moveRight.bind(this)
        };
        this.reverseCommands = {
            a: this.moveRight.bind(this),
            w: this.moveDown.bind(this),
            s:this.moveUp.bind(this),
            d: this.moveLeft.bind(this)
        };
    }

    move() {
        this.rotation = Math.atan2(this.cursorPosition.y - this.y  , this.cursorPosition.x - this.x ) + Math.PI/2;

        this.movements.forEach(((value, key) => {
            this.commands[key]?.();
            if (testHitAABB({x: this.x, y:this.y}, 30,30,1024 - 20,576 - 30)){
                this.reverseCommands[key]?.();
            }
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

    formatToPackage() {
        return {
            spriteIndex: this.sprite,
            rotation: this.rotation,
            x: this.x,
            y: this.y
        }
    }

    get vertices() {
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