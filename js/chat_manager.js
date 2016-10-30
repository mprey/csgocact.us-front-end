$(function() {

  var $chat_textarea = $('#chat-textarea');
  var $chat_online = $('#chat-online');
  var $chat_submit = $('#chat-submit');
  var $chat_emote = $('#emote-wrapper a');
  var $notification_counter = $('.notification-counter');
  var $chat_wrapper = $('#chat-wrapper');

  var emotes = ['4Head', 'ANELE', 'BabyRage', 'BibleThump', 'BrokeBack', 'cmonBruh', 'CoolCat', 'CorgiDerp', 'EleGiggle', 'FailFish', 'FeelsBadMan', 'FeelsGoodMan', 'Kappa', 'KappaPride', 'Kreygasm', 'MrDestructoid', 'OSfrog', 'PogChamp', 'SMOrc', 'SwiftRage', 'WutFace'];

  var socket_incoming = {
    UPDATE_ONLINE: 'CHAT_IN_UPDATE_ONLINE',
    INCREMENT_ONLINE: 'CHAT_IN_INCREMENET_ONLINE',
    DECREMENT_ONLINE: 'CHAT_IN_DECREMENT_ONLINE',
    MUTE_USER: 'CHAT_IN_MUTE_USER',
    BAN_USER: 'CHAT_IN_BAN_USER',
    RECEIVE_MESSAGE: 'CHAT_IN_RECEIVE_MESSAGE'
  };

  var socket_outgoing = {
    SEND_CHAT: 'CHAT_OUT_SEND_MESSAGE',
    MUTE_USER: 'CHAT_OUT_MUTE_USER',
    BAN_USER: 'CHAT_OUT_BAN_USER'
  };

  var chat_manager = new ChatManager();

  function ChatManager(socket) {
    this.socket = socket;

    if (this.socket == null) return;

    this.socket.on(socket_incoming.UPDATE_ONLINE, this.updateOnline);
    this.socket.on(socket_incoming.INCREMENT_ONLINE, this.incrementOnline);
    this.socket.on(socket_incoming.DECREMENT_ONLINE, this.decrementOnline);
  }

  ChatManager.prototype.sendSocketMessage = function(header, data) {
    this.socket.emit(header, data);
  };

  ChatManager.prototype.incrementOnline = function() {
    var current = parseInt($chat_online.text());
    current++;
    $chat_online.text(current);
  };

  ChatManager.prototype.updateOnline = function(amount) {
    $chat_online.text(amount);
  };

  ChatManager.prototype.decrementOnline = function() {
    var current = parseInt($chat_online.text());
    current--;
    $chat_online.text(current);
  };

  ChatManager.prototype.sendBotChat = function(text) {
    var data = {
      profile_img: '../img/chat-bot-profile.png',
      profile_name: 'Chat Bot',
      text: text,
      admin: true
    };
    this.sendChat(data);
  };

  ChatManager.prototype.clearMessages = function() {
    $chat_wrapper.empty();
  };

  ChatManager.prototype.removeMessages = function(id) {

  };

  ChatManager.prototype.scrollToBottom = function() {
    $chat_wrapper.stop().animate({
      scrollTop: $chat_wrapper[0].scrollHeight
    }, 800);
  };

  ChatManager.prototype.sendChat = function(data) { //data.profile_img, data.profile_name, data.text, data.admin
    var date = new Date;
    var timeText = date.getHours() + ':' + date.getMinutes();

    var contentText = this.replaceWithEmotes(data.text);

    var divText = '<div class="chat-message clearfix ' + (data.admin ? 'admin-message' : '') + '"><img class="chat-profile" src="' + data.profile_img + '"><div class="chat-message-content clearfix"><span class="chat-time">' + timeText + '</span><h5>' + data.profile_name + '</h5><p>' + contentText + '</p></div></div>'
    var hrBreak = '<hr class="chat-break">';

    $chat_wrapper.append(divText + hrBreak);

    this.scrollToBottom();
  };

  ChatManager.prototype.addNotification = function() {
    var val = isNaN(parseInt($notification_counter.text())) ? 0 : parseInt($notification_counter.text());
    val++;

    $notification_counter.css({opacity: 0}).text(val).css({top: '-10px'}).transition({top: '-2px', opacity: 1});
  };

  ChatManager.prototype.clearNotifications = function() {
    $notification_counter.text(null);
  };

  ChatManager.prototype.appendText = function(text) {
    var newText = $chat_textarea.val() + text;
    $chat_textarea.val(newText);
  };

  ChatManager.prototype.replaceWithEmotes = function(text) {
    var newText = text;
    for (var index in emotes) {
      if (newText.indexOf(emotes[index]) >= 0) {
        newText = newText.replace(emotes[index], '<img class="chat-emote" src="../img/emotes/' + emotes[index] + '.png">');
      }
    }
    return newText;
  };

  chat_manager.sendChat({
    profile_img: '../img/large-logo.png',
    profile_name: 'mprey',
    text: 'HELLO HOW ARE YOU BOYS DOING Kappa FailFish DERPP RPEP SMOrc WOOOHOOO FeelsBadMan YEAHHHHHHH FeelsGoodMan'
  });

  window.chat_manager = chat_manager;

});
