var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
  // socket.emit('createEmail',{
  //   to:'sheik@gmail.com',
  //   text:'Hey. This is Sheik'
  // });
  socket.emit('createMessage',{
    from:'nisha',
    text:'Salam'
  })
});

socket.on('disconnect',function() {
  console.log('Disconnected from server');
});

// socket.on('newEmail',function(email){
//   console.log('New email', email);
// });

socket.on('newMessage', function(message){
  console.log('new message: ',message);
});
