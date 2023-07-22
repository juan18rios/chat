

const port = 80;
const hostname = '127.0.0.1'
//const port = 2705;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io");
const socket = io(http);
const chatRouter = require("./server/routes/chat");

app.use(bodyParser.json());
app.use("/chat", chatRouter);
app.use(express.static(`${__dirname}/client`));

const chatSchema = require("./server/mongoDB/chatSchema");
const connectDB = require("./server/mongoDB/dbconnection");

socket.on("connection", (socket) => {
    console.log("usuario conectado");
    console.log('Usuario Conectado', socket.id);
    //console.log('Un usuario se ha conectado desde la dirección IP: ', socket.handshake.headers['x-forwarded-for'] || socket.handshake.address);

    socket.on("disconnect", () => {
        //console.log("usuario desconectado desde la dirección IP:", socket.handshake.headers['x-forwarded-for'] || socket.handshake.address);
        console.log('Usuario Desconectado', socket.id);
    });

    socket.on("typing", data => {
        socket.broadcast.emit("notifyTyping", {
            user: data.user,
            message: data.message
        });
    });

    //when soemone stops typing
    socket.on("stopTyping", () => {
        socket.broadcast.emit("notifyStopTyping");
    });
    
    socket.on("chat message", (msg) => {
        console.log(`message: ${msg}`);

        socket.broadcast.emit("received", {
            message: msg
        });

        connectDB.then(db => {
            let mensaje = new chatSchema({
                message: msg,
                //sender: "Anonimo"
                sender: socket.id
                //sender: socket.handshake.headers['x-forwarded-for']
            });
            mensaje.save();
        });
    });

});



http.listen(port, () => {
    //console.log(`Server running at port ${port}`);
    console.log(`Server running at http://${hostname}:${port}`);
});