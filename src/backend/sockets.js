const http = require("../../server.js");
const io = require("socket.io")(http);
const Player = require("./Player.js");
const Bullet = require("./Bullet.js");
const collision = require("./collision.js");

const tickRate = 60;
const gameState = {
    state: "running",
    players: {},
    bullets: {},
    mapSize: {
        width: 1024,
        height: 576
    }
}

const addPlayer = (socketId) => {
    gameState.players[socketId] = new Player(350, 350, "black");
    gameState.bullets[socketId] = [];
}

const shootBullet = (socketId, cursorPosition) => {
    const player = gameState.players[socketId];
    gameState.bullets[socketId].push(new Bullet(player.x, player.y,cursorPosition));
}

io.on('connection', (socket) => {
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

const tick = () => {

    for (let player of Object.values(gameState.players)) {
        player.move();
    }

    const bul = [];
    for (let playerBullets of Object.values(gameState.bullets)) {
        for (let bullet of playerBullets) {
            bullet.move();
            bul.push({x: bullet.x, y:bullet.y});
        }
    }

    const dataToSend = {
        players: Object.values(gameState.players).map(player => player.vertices),
        bullets: bul
    }

    io.emit("server tick", dataToSend);
}

setInterval(tick, 1000 / tickRate);