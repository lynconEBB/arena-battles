export class Polygon {
    constructor(props) {
        this.x = 0;
        this.y = 0;
        this.vertices = [];
        this.rotation = 0;
    }


    /**
     * Creates a standard polygon shape with the requested number of sides
     * @param {int} numOfSides
     * @param {number} radius
     */
    static CreatePolygon(numOfSides=3, radius = 100)
    {
        var poly = new SATPolygon();

        // figure out the angles required
        var rotangle = (Math.PI * 2) / numOfSides;
        var angle = 0;

        // loop through and generate each point
        for (var i = 0; i < numOfSides; i++) {
            angle = (i * rotangle) + ((Math.PI-rotangle)*0.5);
            let pt = new SATPoint(Math.cos(angle) * radius, Math.sin(angle) * radius);
            poly.vertices.push(pt);
        }
        return poly;
    }

    clone()
    {
        let clone = new SATPolygon();
        clone.x = this.x;
        clone.y = this.y;
        clone.vertices = this.vertices.map(x => x.clone());
        clone.rotation = this.rotation;
        clone.scale = this.scale;
        return clone;
    }


    getTransformedVertices()
    {
        return this.vertices.map(vert => {
            var newVert = vert.clone();
            if (this.rotation != 0)
            {
                let hyp = Math.sqrt(Math.pow(vert.x, 2) + Math.pow(vert.y,2));
                let angle = Math.atan2(vert.y, vert.x);
                angle += this.rotation * (Math.PI / 180);

                newVert.x = Math.cos(angle) * hyp;
                newVert.y = Math.sin(angle) * hyp;
            }
            if (this.scale != 0)
            {
                newVert.x *= this.scale;
                newVert.y *= this.scale;
            }

            return newVert;
        });
    }
}