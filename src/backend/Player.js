const Vector = require("./Vector.js");

class Player{
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.alive = true;
        this.width = 30;
        this.height = 80;
        this.rotation = 0;
        this.speed = 1;
        this.color = color;
    }

    get vertices() {
        //this.rotation = Math.atan2(cursor.y - (this.y + this.height /2), cursor.x - (this.x + this.width / 2));

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
        console.log(vertices);
        return vertices;
    }
}

module.exports = Player;