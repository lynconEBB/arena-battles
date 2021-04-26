const serverSocket = require("../../server.js");
const collision = require("./collision.js");

const tickRate = 60;

const states = {
    RUNNING: 1,
    STOPPED: 2,
}

const gameState = {
    state: states.RUNNING,
    players: {},
    bullets: {},
    mapCorners: {
        right: 1024 - 30,
        left: 30,
        top: 30,
        bottom: 576 - 30
    }
}

const checkBulletPlayerCollision = () => {

}

const tick = () => {

    for (let player of Object.values(gameState.players)) {
        player.move();
    }

    const bul = [];
    for (let playerBullets of Object.values(gameState.bullets)) {
        for (let index in playerBullets) {
            playerBullets[index].move();
            if (collision.testHitAABB({x: playerBullets[index].x, y: playerBullets[index].y},30,30,1024 - 20,576 - 30)) {
                playerBullets.splice(index, 1);
            } else {
                bul.push({x: playerBullets[index].x, y: playerBullets[index].y});
            }
        }
    }

    const dataToSend = {
        players: Object.values(gameState.players).map(player => player.vertices),
        bullets: bul
    }

    serverSocket.emit("server tick", dataToSend);
}

setInterval(tick, 1000 / tickRate);

module.exports = gameState;

require("./eventHandlers.js");