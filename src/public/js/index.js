
//Con este socket vamos a establecer la comunicacion con nuestro servidor (El handshake)
const socket = io();

// swal.fire({
//     title: "Saludo",
//     text: "Mensaje inicial",
//     icon: "success"
// })

//Vamos a desarrollar el modal de autenticacion:
let user;
const chatBox = document.getElementById("chatBox");
const messagesLog = document.getElementById("messageLogs");

swal.fire({
    title: "Identificate",
    input: "text",
    text: "ingresa el usuario para identificarte  en el chat",
    inputValidator: (value) =>{
        return !value && "Necesitas escribir un nombre de usuario para comenzar a chatear"
    },
    //Evento para controlar el click fuera del modal para salir
    allowOutsideClick: false,
    //Evento para controlar escape para salir,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    socket.emit("authenticated", user);
})

chatBox.addEventListener("keyup", evt =>{
    //Verificar que la tecla apretada sea enter:
    if(evt.key === "Enter"){
        //con trim() elimino los espacios en blanco, y si el length es mayor a cero, es decir no son solo espacios entrara al if.
        if(chatBox.value.trim().length>0){
            //Envio el usuario, y el mensaje que envia ese usuario.
            socket.emit("message", {user, message: chatBox.value})

            //Logica para borrar el mensaje del chatbox.
            chatBox.value = "";
        }}
});

socket.on("messageLogs", data =>{
    let messages= "";
    data.forEach(message => {
        messages +=  `${message.user} dice:  ${message.message} <br/>`;

        messagesLog.innerHTML = messages;
    });
})

//Leo cuando un nuevo usuario se conecta y lo muestro con un modal
socket.on("newUserConnected", data =>{
    swal.fire({
        toast: true,
        position: "top-end",
        showConfirmationButton: false,
        timer : 3000,
        title : `${data} se ha unido al chat`,
        icon : "success"

    })
})