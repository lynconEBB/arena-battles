const Vector = require("../collision/Vector.js");
const {testHitAABB} = require("../collision/collision.js");

const gameCorners = {
    top: 0,
    bottom: 576,
    left: 0,
    right: 1024
}

const PLAYER_INITIAL_POSITIONS = {
    1: {x: 512, y: 30},
    2: {x: 30, y: 288},
    3: {x: 512, y: 555},
    4: {x: 1000, y: 288},
}

class Player{
    constructor(playerIndex, roomId) {
        this.x = PLAYER_INITIAL_POSITIONS[playerIndex].x;
        this.y = PLAYER_INITIAL_POSITIONS[playerIndex].y;
        this.sprite = playerIndex;
        this.currentRoom = roomId;
        this.isAlive = true;
        this.rotation = Math.PI/2;
        this.bullets = {};
        this.lastShotTimestamp = 0;
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

    reset() {
        this.x = PLAYER_INITIAL_POSITIONS[this.sprite].x;
        this.y = PLAYER_INITIAL_POSITIONS[this.sprite].y;
        this.isAlive = true;
        this.rotation = Math.PI/2;
        this.movements = new Map();
    }

    move() {
        this.rotation = Math.atan2(this.cursorPosition.y - this.y  , this.cursorPosition.x - this.x ) + Math.PI/2;

        this.movements.forEach(((value, key) => {
            this.commands[key]?.();
            if (this.isHittingCorner()){
                this.reverseCommands[key]?.();
            }
        }));
    }

    isHittingCorner() {
        return testHitAABB({x: this.x, y:this.y}, gameCorners.left, gameCorners.top, gameCorners.right, gameCorners.bottom);
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
            new Vector(this.x + 20, this.y + 10),
            new Vector(this.x + 40, this.y + 10),
            new Vector(this.x + 60, this.y + 35),
            new Vector(this.x + 60, this.y + 50),
            new Vector(this.x + 40, this.y + 35),
            new Vector(this.x + 20, this.y + 35),
            new Vector(this.x, this.y + 50),
            new Vector(this.x, this.y + 35),
        ];

        for (let vertex of vertices) {
            vertex.translate(-(this.x + 30), -(this.y + 25) );
            vertex.rotate(this.rotation);
            vertex.translate(this.x, this.y);
        }

        return vertices;
    }
}

module.exports = Player;