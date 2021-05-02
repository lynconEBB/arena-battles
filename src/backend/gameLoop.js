const serverSocket = require("../../server.js");
const collision = require("./collision/collision.js");
const gameState = require("./gameState.js");
const Vector = require("./collision/Vector.js");
require("./eventHandlers.js");

const tickRate = 30;

const checkBulletPlayerCollision = (room, bullet) => {

    room.players.forEach(playerId => {
        const player = gameState.getPlayer(playerId);
        if (playerId !== bullet.playerId && player.isAlive) {
            if (collision.testHitPolygonCircle(player.vertices, new Vector(bullet.x, bullet.y), 5)) {
                player.isAlive = false;
                gameState.removeBullet(bullet.id);
            }
        }
    });
}

const tick = () => {

    gameState.forEachRoom((room, roomId) => {
        if (room.state === "running") {
            const dataToSend = {
                players: [],
                bullets: []
            }

            room.players.forEach(playerId => {
                const player = gameState.getPlayer(playerId);

                if (player.isAlive) {
                    player.move();
                    dataToSend.players.push(player.formatToPackage());
                }

                for (let bulletId in player.bullets) {
                    const bullet = gameState.getBullet(bulletId);
                    if (bullet.isHittingCorner()) {
                        gameState.removeBullet(bulletId);
                        continue;
                    }
                    dataToSend.bullets.push(bullet.formatToPackage());
                    bullet.move();
                    checkBulletPlayerCollision(room, bullet);
                }

            });

            serverSocket.to(roomId).emit("server tick", dataToSend);
        }
    });
}

setInterval(tick, 1000 / tickRate);

