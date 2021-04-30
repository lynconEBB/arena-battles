const serverSocket = require("../../server.js");
const gameState = require("./gameState.js");

serverSocket.on('connection', (socket) => {
    console.log("New client connected with id: " + socket.id );

    socket.on("create room", () => {
        gameState.createRoom(socket.id);
        socket.join(socket.id);
        socket.emit("room created");
    });

    socket.on("enter room", roomId => {
        gameState.addPlayerToRoom(roomId, socket.id);
        socket.join(roomId);
        socket.emit("room entered");
    });

    socket.on("key press", key => {
        gameState.getPlayer(socket.id).movements.set(key, true);
    });

    socket.on("key up", key => {
        gameState.getPlayer(socket.id).movements.delete(key);
    });

    socket.on("mouse move", cursor => {
        gameState.getPlayer(socket.id).cursorPosition = cursor;
    });

    socket.on("shoot", cursor => {
        //shootBullet(socket.id, cursor);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected with id: " + socket.id );
        gameState.removePlayerFromRoom();
    });
});