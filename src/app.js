import express from "express";
import handlebars from "express-handlebars";
import  __dirname  from "./utils.js";
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js"

const app = express();


//Servidor archivos estaticos:

app.use(express.static(`${__dirname}/public`));

//Motor de plantillas:
//Siempre seran las mismas 3 lineas cuando trabajemos con plantillas.

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//Routes
app.use("/", viewsRouter);

//Declaramos el servidor
const server = app.listen(8080, () => console.log("Server running"));

//Configuracion del socket
const socketServer = new Server(server);

//Mensajes de nuestros clientes que se van a ir guardando
 const messages = []


//configuracion con el servidor
socketServer.on("connection", socket =>{
//Mostrar cuando se conecta un nuevo cliente
console.log("Nuevo cliente conectado");

socket.on("message", data=>{
    //leemos el evento "message" recibido desde index.js y manejamos la data.
    messages.push(data);

    socketServer.emit("messageLogs", messages)
    //Enviamos a todos los clientes el mensaje, luego restaria solo "pintarlos en pantalla"
})

//Escuchar cuando se conecta un nuevo cliente.
socket.on("authenticated", data => {
//Cuando se conecta le voy a mostrar todos los mensajes al nuevo cliente que recien se conecta, no a todos.
socket.emit("messageLogs", messages);
//Mostrar nuevo usuario conectado 
socket.broadcast.emit("newUserConnected", data);
})
})