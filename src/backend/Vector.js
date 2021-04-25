class Vector {

    constructor(x = 1, y = 1) {
        this.x = x;
        this.y = y;
    }

    translate(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
    }

    rotate(angle) {
        const xClone = Number(this.x);

        this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        this.y = xClone * Math.sin(angle) + this.y * Math.cos(angle);
    }

    getLength() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y, 2));
    }

    getPerpendicularVector() {
        return new Vector(-this.y , this.x );
    }

    dotProductWith(otherVector) {
        return otherVector.x * this.x + otherVector.y * this.y;
    }

    normalize() {
        let magnitude = this.getLength();
        this.x /= magnitude;
        this.y /= magnitude;
    }

    getProjectionLengthOnto (projectionVector) {
        return this.dotProductWith(projectionVector) / projectionVector.getLength();
    }
}

module.exports = Vector