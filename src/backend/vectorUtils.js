const Vector = require("./Vector.js");

/**
 * Cria um vetor subtraindo o vetor1 do verto2
 *
 * @param {Vector} vector1
 * @param {Vector} vector2
 * @returns {Vector}
 */
const subtractVectors = (vector1, vector2) => {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
};

/**
 * Cria um vetor adicionando o vetor1 do verto2
 *
 * @param {Vector} vector1
 * @param {Vector} vector2
 * @returns {Vector}
 */
const addVectors = (vector1, vector2) => {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
};

module.exports = {
    subtractVectors,
    addVectors
}