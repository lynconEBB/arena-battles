const serverSocket = require("../server.js");
const gameState = require("./gameState.js");

serverSocket.on('connection', (socket) => {
    console.log("New client connected with id: " + socket.id );

    socket.on("create room", () => {
        gameState.createRoom(socket.id);
        socket.join(socket.id);
        const room = gameState.getRoom(socket.id);
        socket.emit("room created", socket.id, room.state, true, 1);
        socket.emit("player count", room.players.size);
    });

    socket.on("enter room", roomId => {
        if (gameState.getRoom(roomId)) {
            gameState.addPlayerToRoom(roomId, socket.id);
            socket.join(roomId);
            const player = gameState.getPlayer(socket.id);
            const room = gameState.getRoom(roomId);
            socket.emit("room entered", roomId, room.state, false, player.sprite);
            serverSocket.to(roomId).emit("player count", room.players.size);
        } else {
            socket.emit("error");
        }
    });

    socket.on("key press", key => {
        const playerRoom = gameState.getRoom(gameState.getPlayer(socket.id)?.currentRoom);
        if (playerRoom && playerRoom.state === "running") {
            gameState.getPlayer(socket.id).movements.set(key, true);
        }
    });

    socket.on("key up", key => {
        const playerRoom = gameState.getRoom(gameState.getPlayer(socket.id)?.currentRoom);
        if ( playerRoom && playerRoom.state === "running") {
            gameState.getPlayer(socket.id).movements.delete(key);
        }
    });

    socket.on("mouse move", cursor => {
        const playerRoom = gameState.getRoom(gameState.getPlayer(socket.id)?.currentRoom);
        if (playerRoom && playerRoom.state === "running") {
            gameState.getPlayer(socket.id) && (gameState.getPlayer(socket.id).cursorPosition = cursor);
        }
    });

    socket.on("shoot", cursor => {
        const playerRoom = gameState.getRoom(gameState.getPlayer(socket.id)?.currentRoom);

        if (playerRoom && playerRoom.state === "running" && gameState.getPlayer(socket.id).isAlive
                && gameState.getPlayer(socket.id).lastShotTimestamp + 700 < Date.now()) {

            gameState.getPlayer(socket.id).lastShotTimestamp = Date.now();
            gameState.addBulletToPlayer(socket.id, cursor);
        }
    });

    socket.on("start game", () => {
        const room = gameState.getRoom(socket.id);
        room.players.forEach(playerId => {
            const player = gameState.getPlayer(playerId);
            player.isAlive = true;
            player.reset();
            for (let bulletId in player.bullets) {
                gameState.removeBullet(bulletId);
            }
        });
        gameState.getRoom(socket.id).state = "running";

        serverSocket.to(socket.id).emit("state change", "running");
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected with id: " + socket.id );

        let room = gameState.getRoom(socket.id);
        if (room) {
            serverSocket.to(socket.id).emit("error");
            gameState.removeRoom(socket.id);
        }

        let roomId = gameState.getPlayer(socket.id)?.currentRoom;
        if (roomId) {
            let room = gameState.getRoom(roomId);
            gameState.removePlayerFromRoom(socket.id);
            serverSocket.to(roomId).emit("player count", room.players.size);
        }
    });
});