const http = require("../../server.js");
const io = require("socket.io")(http);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

