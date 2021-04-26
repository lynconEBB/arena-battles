const gameState = require("./gameLoop.js");
const serverSocket = require("../../server.js");
const Player = require("./Player.js");
const Bullet = require("./Bullet.js");

const addPlayer = (socketId) => {
    gameState.players[socketId] = new Player(350, 350, "black");
    gameState.bullets[socketId] = [];
}

const shootBullet = (socketId, cursorPosition) => {
    const player = gameState.players[socketId];
    gameState.bullets[socketId].push(new Bullet(player.x, player.y,cursorPosition));
}

serverSocket.on('connection', (socket) => {
    console.log("New client connected with id: " + socket.id );
    addPlayer(socket.id);

    socket.on("key press", key => {
        gameState.players[socket.id].movements.set(key, true);
    });

    socket.on("key up", key => {
        gameState.players[socket.id].movements.delete(key);
    });

    socket.on("mouse move", cursor => {
        gameState.players[socket.id].cursorPosition = cursor;
    });

    socket.on("shoot", cursor => {
        shootBullet(socket.id, cursor);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected with id: " + socket.id );
        delete gameState.players[socket.id];
    });
});