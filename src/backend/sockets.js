const http = require("../../server.js");
const io = require("socket.io")(http);
const Player = require("./Player.js");

const sockets = {};

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

    sockets[socket.id] = socket;
    addPlayer(socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected with id: " + socket.id );
        delete sockets[socket.id];
        delete gameState.players[socket.id];
    });
});

const tick = () => {

    const dataToSend = {
        players: Object.values(gameState.players).map(player => player.vertices)
    }

    io.emit("server tick", dataToSend);
}

setInterval(tick, 1000/ tickRate);