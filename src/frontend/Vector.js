export class Vector {

    constructor(x = 1, y = 1) {
        this.x = x;
        this.y = y;
    }

    normalize() {

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

    getPerpendicularVector() {

    }

    dotProductWith(otherVector) {

    }

    crossProductWith (otherVector) {

    }

    getProjectionOnto (projectionVector) {

    }
}