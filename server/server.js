const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(newMessage)=> {
    console.log(newMessage);
    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
  })
  socket.on('disconnect',() => {
    console.log('Disconnected from client');
  });
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
