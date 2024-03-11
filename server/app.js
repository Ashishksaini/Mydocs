const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.use(express.json());



io.on("connection", (socket) => {
    console.log("connection from socket " + socket.id);
    socket.join("chats");
    socket.on("change", (delta) => {
        console.log("chagne ocuured ", delta);
            socket.to("chats").emit("change",delta);
    })
})

server.listen(8000, () => {
    console.log(`Server is listening to the port ${8000}`)
})

module.exports ={server,io}

