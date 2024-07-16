const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
const value = path.join(__dirname, "public")
app.set(express.static(value));

io.on("connection", function(socket){
    socket.on('send-location', function(data){
        io.emit('recieve-location', {id: socket.id, ...data})
    })

    socket.on('disconnect', function(){
        io.emit('user-disconnected', socket.id);
    })
});


app.get("/", function(req, res) {
    console.log();
    res.render("index");
})

server.listen(3000);