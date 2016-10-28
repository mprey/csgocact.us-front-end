$(function() {

  var $chat_textarea = $('#chat-textarea');
  var $chat_online = $('#chat-online');
  var $chat_submit = $('#chat-submit');
  var $chat_emote = $('#emote-wrapper a');
  var $notification_counter = $('.notification-counter');
  var $chat_wrapper = $('#chat-wrapper');

  var emotes = ['4Head', 'ANELE', 'BabyRage', 'BibleThump', 'BrokeBack', 'cmonBruh', 'CoolCat', 'CorgiDerp', 'EleGiggle', 'FailFish', 'FeelsBadMan', 'FeelsGoodMan', 'Kappa', 'KappaPride', 'Kreygasm', 'MrDestructoid', 'OSfrog', 'PogChamp', 'SMOrc', 'SwiftRage', 'WutFace'];

  var chat_manager = new ChatManager();

  function ChatManager() {
    //TODO instantiate?
  }

  ChatManager.prototype.sendBotChat = function(text) {
    var data = {
      profile_img: '',
      profile_name: 'Chat Bot',
      text: text
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

  ChatManager.prototype.sendChat = function(data) { //data.profile_img, data.profile_name, data.text
    var date = new Date;
    var timeText = date.getHours() + ':' + date.getMinutes();

    var contentText = this.replaceWithEmotes(data.text);

    var divText = '<div class="chat-message clearfix"><img class="chat-profile" src="' + data.profile_img + '"><div class="chat-message-content clearfix"><span class="chat-time">' + timeText + '</span><h5>' + data.profile_name + '</h5><p>' + contentText + '</p></div></div>'
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
    console.log(text);
    var newText = text;
    for (var index in emotes) {
      if (newText.indexOf(emotes[index]) >= 0) {
        newText = newText.replace(emotes[index], '<img class="chat-emote" src="../img/emotes/' + emotes[index] + '.png">');
      }
    }
    return newText;
  };

  $chat_emote.on('click', function(event) {
    event.preventDefault();
    chat_manager.appendText($(this).children('span').text());
  });

  chat_manager.sendChat({
    profile_img: '../img/large-logo.png',
    profile_name: 'mprey',
    text: 'HELLO HOW ARE YOU BOYS DOING Kappa FailFish DERPP RPEP SMOrc WOOOHOOO FeelsBadMan YEAHHHHHHH FeelsGoodMan'
  });

  window.chat_manager = chat_manager;

});
