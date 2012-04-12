var socket = io.connect();

socket.on('connect', function() {
  console.log('connected');
  console.log('transport is', socket.socket.transport);
});
socket.on('msg push', function (msg) {
  console.log('pushed : ' + msg);
  var date = new Date();
  $('#list').prepend($('<dt>' + date + '</dt><dd>' + msg + '</dd>'));
});

$(function () {
  $('#form').submit(function() {
    var message = $('#message');
    socket.emit('msg send',message.val());
    message.attr('value', '');
    return false;
  });
});