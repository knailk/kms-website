const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    })

    socket.on("join_room", (data) => {
        console.log(data)
        socket.join(data);
    });
});
server.listen(3001, () => {
    console.log('listening on *:3001');
})