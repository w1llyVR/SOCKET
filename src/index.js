const { Socket } = require("dgram");
const express = require("express");
const { createServer } = require("http");
const path = require("path");
const { Server } = require("socket.io")

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

//Declarar donde se van a guardar los archivos estaticos
app.use(express.static(path.join(__dirname, "views")))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

io.on("connection", socket => {

    // USO DE EVENTOS
    // console.log('Clientes conectados: ', io.engine.clientsCount);
    // console.log('ID del socket conectado', socket.id)
    // //El on sirve para escuhar eventos
    // // socket.on("disconnect", () => {
    // //     console.log("El socket " + socket.id + " se ha desconectado");
    // // })
    // socket.conn.once("upgrade", () => {
    //     console.log("Hemos pasado de HTTP Long-Polling a", socket.conn.transport.name);
    // })

    //
    //EMISION DE EVENTOS

    //Emisión básica
    socket.emit("welcome", "Ahora estás conectado 😎");

    socket.on("server", data => {
        console.log(data);
    })

    //Emision a todos
    io.emit('everyone', socket.id + " se ha conectado");
});


httpServer.listen(3000);