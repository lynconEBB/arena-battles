const Vector = require("./Vector.js");
const { subtractVectors } = require("./vectorUtils.js");
const gameState = require("./gameLoop.js");
const { v4: uuid } = require('uuid');

class Bullet{

    constructor(x, y, cursorPosition, playerId) {
        this.x = x;
        this.y = y;
        this.playerId = playerId;
        this.id = uuid();
        this.initialPosition = new Vector(x,y);
        this.color = "#000";
        this.step = 1;
        this._setDirection(cursorPosition);
    }

    _setDirection (cursorPosition) {
        const cursorVector = new Vector(cursorPosition.x, cursorPosition.y);
        this.direction = subtractVectors(cursorVector, this.initialPosition);
        this.direction.normalize();
    }

    formatToPackage() {

    }

    checkCornerCollision() {

    }

    move() {
        this.step += 20;
        this.x = this.initialPosition.x + this.step * this.direction.x;
        this.y = this.initialPosition.y + this.step * this.direction.y;
    }
}

module.exports = Bullet;