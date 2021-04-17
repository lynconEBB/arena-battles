import {Vector} from "./Vector.js";

export const cursor = new Vector(0, 0);

addEventListener("mousemove", event => {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
});