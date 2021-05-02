const Vector = require("../collision/Vector.js");
const { subtractVectors } = require("../collision/vectorUtils.js");
const {testHitAABB} = require("../collision/collision.js");

const gameCorners = {
    top: 0,
    bottom: 576,
    left: 0,
    right: 1024
}

class Bullet{
    constructor(id, x, y, cursorPosition, playerId) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.playerId = playerId;
        this.initialPosition = new Vector(x,y);
        this.step = 1;
        this._setDirection(cursorPosition);
    }

    _setDirection (cursorPosition) {
        const cursorVector = new Vector(cursorPosition.x, cursorPosition.y);
        this.direction = subtractVectors(cursorVector, this.initialPosition);
        this.direction.normalize();
    }

    formatToPackage() {
        return {x: this.x, y: this.y};
    }

    isHittingCorner() {
       return testHitAABB({x: this.x, y:this.y}, gameCorners.left, gameCorners.top, gameCorners.right, gameCorners.bottom);
    }

    move() {
        this.step += 15;
        this.x = this.initialPosition.x + this.step * this.direction.x;
        this.y = this.initialPosition.y + this.step * this.direction.y;
    }
}

module.exports = Bullet;