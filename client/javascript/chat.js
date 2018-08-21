$('document').ready(function() {

  // hide the chatroom until name provided to server
  $('#chatroom').hide();

  socket = io.connect();

  $('#join').click(function() {
    socket.emit('join', $('#name').val());
  });

  $('#send').click(function() {
    // make sure there is a message, then send it
    if ( $('#message').val() ) {
      socket.emit('message', $('#message').val());
      // reset message to empty
      $('#message').val('');
    }
  });

  socket.on('joined', function(discussion) {
    // name has been provided, hide login area and show chat
    $('#logon').hide();
    $('#chatroom').show();
    showDiscussion(discussion);
  });

  socket.on('new_message', function(message) {
    appendMessage(message)
  });

});

function showDiscussion(discussion) {
  for ( var idx = 0; idx < discussion.length; idx++ ) {
    appendMessage(discussion[idx]);
  }
}

function appendMessage(message) {
  $('#chat').append(`<p>${message}</p>`);
}
