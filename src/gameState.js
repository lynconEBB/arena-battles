const Player = require("./Actors/Player.js");
const Bullet = require("./Actors/Bullet.js");
const { v4: uuid } = require('uuid');

const rooms = new Map();
const players = new Map();
const bullets = new Map();

const forEachRoom = (callbackFunction) => {
    rooms.forEach(callbackFunction)
}

const getRoom = (roomId) => {
    return rooms.get(roomId);
}

const removeRoom = (roomId) => {
    const room = getRoom(roomId);
    room.players.forEach(playerId => {
        const player = getPlayer(playerId);
        for (let bulletId in player.bullets) {
            bullets.delete(bulletId);
        }
        players.delete(playerId);
    });
    rooms.delete(roomId);

};

const createRoom = (roomId) => {
    rooms.set(roomId, {
        state: "waiting",
        players: new Map(),
    });
    addPlayerToRoom(roomId, roomId);
};

const addPlayerToRoom = (roomId, playerId) => {
    const numberOfPlayers = rooms.get(roomId).players.size;
    if (numberOfPlayers === 4) {
        return false;
    }
    players.set(playerId, new Player(numberOfPlayers + 1, roomId));
    rooms.get(roomId).players.set(playerId,playerId);
};

const removePlayerFromRoom = (playerId) => {
    let player = getPlayer(playerId);
    let room = rooms.get(player?.currentRoom);
    room && room.players.delete(playerId);
    players.delete(playerId);
};

const getPlayer = (playerId) => {
    return players.get(playerId);
}

const getBullet = (bulletId) => {
    return bullets.get(bulletId);
}

const addBulletToPlayer = (playerId, cursorPosition) => {
    let player = getPlayer(playerId);
    let newBulletId = uuid();
    bullets.set(newBulletId, new Bullet(newBulletId, player.x, player.y, cursorPosition, playerId));
    player.bullets[newBulletId] = newBulletId;
}

const removeBullet = (bulletId) => {
    let playerId = getBullet(bulletId).playerId;
    playerId && delete getPlayer(playerId).bullets[bulletId];
    bullets.delete(bulletId);
}

const getPlayersAlive = (roomId) => {
    const playersAlive = [];

    rooms.get(roomId).players.forEach(playerId => {
        getPlayer(playerId).isAlive && playersAlive.push(playerId);
    });

    return playersAlive;
}

module.exports = {
    addPlayerToRoom,
    removePlayerFromRoom,
    removeRoom,
    createRoom,
    getPlayer,
    forEachRoom,
    addBulletToPlayer,
    getBullet,
    removeBullet,
    getRoom,
    rooms,
    getPlayersAlive
}