$(function() {

  var $chat_textarea = $('#chat-textarea');
  var $chat_online = $('#chat-online');
  var $chat_submit = $('#chat-submit');
  var $chat_emote = $('#emote-wrapper a');

  var chat_manager = new ChatManager();

  function ChatManager() {
    //TODO instantiate?
  }

  ChatManager.prototype.addNotification = function() {

  };

  ChatManager.prototype.clearNotifications = function() {

  };

  ChatManager.prototype.appendText = function(text) {
    var newText = $chat_textarea.val() + text;
    $chat_textarea.val(newText);
  };

  $chat_emote.on('click', function(event) {
    event.preventDefault();
    chat_manager.appendText($(this).children('span').text());
  });

});
