const Player = require("./Player.js");

const rooms = new Map();
const players = new Map();
const bullets = new Map();

const addPlayerToRoom = (roomId, playerId) => {
    const numberOfPlayers = rooms.get(roomId).players.length;
    if (numberOfPlayers === 4) {
        return false;
    }

    players.set(playerId, new Player(numberOfPlayers + 1));
    rooms.get(roomId).players.push(playerId);
};

const removePlayerFromRoom = (playerId) => {
    players.delete(playerId);
};

const getPlayer = (playerId) => {
    return players.get(playerId);
}

const forEachRoom = (callbackFunction) => {
    rooms.forEach(callbackFunction)
}

const removeRoom = (roomId) => {
    rooms.delete(roomId);
};

const createRoom = (roomId) => {
    rooms.set(roomId, {
        state: "waiting",
        players: [],
    });
    addPlayerToRoom(roomId, roomId);
};

module.exports = {
    addPlayerToRoom,
    removePlayerFromRoom,
    removeRoom,
    createRoom,
    getPlayer,
    forEachRoom
}