const express = require('express'),
      path = require('path'),
      port = process.env.PORT || 8000,
      app = express(),
      server = app.listen(port, () => console.log(`listening on port ${port}`)),
      io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'client')));

discussion = ['Start of chat'];  // chatroom discussion

io.on('connection', (socket) => {

  let userName;  // user on this socket connection

  socket.on('join', (name) => {
    // keep track of user on this socket
    userName = name;
    // let everyone else know that user has joined
    socket.broadcast.emit('new_message', `${name} joined chat`);
    // send new user the discussion
    socket.emit('joined', discussion);
  });

  socket.on('message', (message) => {
    // create message with user's name
    let newMessage = `${userName}: ${message}`;
    // add it to the discussion
    discussion.push(newMessage);
    // send everyone the message to show in their chatroom
    io.emit('new_message', newMessage);
  });

});
