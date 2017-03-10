const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname,'../public');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New user connected');



  socket.on('join',(param,callback) => {
    if(!isRealString(param.name) || !isRealString(param.room)){
      callback('Name and room name are required')
    }

    socket.join(param.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, param.name, param.room);

    io.to(param.room).emit('updateUserList',users.getUserList(param.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.to(param.room).emit('newMessage',generateMessage('Admin',`${param.name} has joined`));
    callback();
  });

  socket.on('createMessage',(message, callback)=> {
    console.log(message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is from server');
  });

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude))
  })

  socket.on('disconnect',() => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
