const serverSocket = require("../server.js");
const collision = require("./collision/collision.js");
const gameState = require("./gameState.js");
const Vector = require("./collision/Vector.js");
require("./eventHandlers.js");

const tickRate = 60;

const checkBulletPlayerCollision = (room, bullet, roomId) => {
    room.players.forEach(playerId => {
        const player = gameState.getPlayer(playerId);
        if (playerId !== bullet.playerId && player.isAlive) {
            if (collision.testHitPolygonCircle(player.vertices, new Vector(bullet.x, bullet.y), 5)) {
                player.isAlive = false;
                gameState.removeBullet(bullet.id);
                serverSocket.sockets.sockets.get(playerId).emit("state change", "eliminated");
                const playersAlive = gameState.getPlayersAlive(roomId);
                if (playersAlive.length === 1) {
                    const winner = gameState.getPlayer(playersAlive[0]);
                    room.state = "waiting";
                    serverSocket.to(roomId).emit("state change", "waiting");
                    serverSocket.to(roomId).emit("game winner", winner.sprite);
                }
            }
        }
    });
}

const tick = () => {
    console.log(gameState.rooms.size);
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
                    checkBulletPlayerCollision(room, bullet,roomId);
                }

            });

            serverSocket.to(roomId).emit("server tick", dataToSend);
        }
    });
}

setInterval(tick, 1000 / tickRate);

