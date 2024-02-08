const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const express = require("express");
const {Server}  = require("socket.io")

server.use(middlewares)

// server.use(express.static(__dirname + '/public'));
// const http = require("http").Server(server);
// const cors = require("cors");

// return false;

// const io  = require("socket.io")(http, {
//     cors:{
//         origin:"http://localhost:8080",
//         methods:["GET","POST"],
//         credentials:true,
//         alowEIO3: true
//     },
//     transport:["websocket"]
// })

// const io = new Server(http)


// io.on("connection", function(socket){
//     console.log("connected");

//     socket.on("disconnect", function(){
//         console.log("disconnected");
//     });

//     socket.on("login", function(obj){
//         console.log(obj);
//     })

//     socket.on("chat message", function(msg){
//         console.log(msg);
//     })

// })

server.use(router)


server.listen(3000, () => {
    console.log('JSON Server is running')
  })

// http.listen(3000, function(){
//     console.log("listen on 3000")
// })