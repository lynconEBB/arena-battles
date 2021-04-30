const serverSocket = require("../../server.js");
const collision = require("./collision.js");
const gameState = require("./gameState.js");
const tickRate = 60;

const checkBulletPlayerCollision = () => {

}

const tick = () => {

   /* for (let player of Object.values(gameState.players)) {
        player.move();
    }

    const bul = [];
    for (let playerBullets of Object.values(gameState.bullets)) {
        for (let index in playerBullets) {
            playerBullets[index].move();
            if (collision.testHitAABB({x: playerBullets[index].x, y: playerBullets[index].y},30,30,1024 - 30,576 - 30)) {
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
*/

    gameState.forEachRoom((room, roomId) => {
        if (room.state !== "running") {
            const dataToSend = {
                players: [],
                bullets: []
            }

            for (let playerId of room.players) {
                gameState.getPlayer(playerId).move();
                dataToSend.players.push(gameState.getPlayer(playerId).formatToPackage());
            }

            serverSocket.to(roomId).emit("server tick", dataToSend);
        }
    });
}

setInterval(tick, 1000 / tickRate);

require("./eventHandlers.js");