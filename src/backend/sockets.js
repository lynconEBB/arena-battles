const http = require("../../server.js");
const io = require("socket.io")(http);
const Player = require("./Player.js");

const tickRate = 30;
const gameState = {
    state: "running",
    players: {},
    bullets: {}
}


const addPlayer = (socketId) => {
    gameState.players[socketId] = new Player(350, 350, "black");
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
        const player =  gameState.players[socket.id];
        player.cursorPosition = cursor;
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

    const dataToSend = {
        players: Object.values(gameState.players).map(player => player.vertices)
    }

    io.emit("server tick", dataToSend);
}

setInterval(tick, 1000/ tickRate);