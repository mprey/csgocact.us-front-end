$(function() {

  var $client_settings_save = $('#settings-save');
  var $volume_slider = $('#volume-slider');
  var $scroll_checkbox = $('#scroll-checkbox');
  var $ping_checkbox = $('#ping-checkbox');

  var settings = new Settings();

  var values = {
    "volume_value": 50,
    "autoscroll_value": 0,
    "message_ping_value": 0
  };

  function Settings() {
    this.type = {
      CLIENT: 0,
      USER: 1
    };
  }

  Settings.prototype.init = function() {
    for (key in values) {
      if (Cookies.get(key) && !isNaN(parseInt(Cookies.get(key)))) {
        var value = parseInt(Cookies.get(key));
        values[key] = value;
      }
    }
    this.loadLocalData();
  };

  Settings.prototype.loadLocalData = function() {
    $volume_slider.val(values["csgocactus_volume_value"]);
    $scroll_checkbox.prop('checked', (values["csgocactus_autoscroll_value"] == 1 ? true : false));
    $ping_checkbox.prop('checked', (values["csgocactus_message_ping_value"] == 1 ? true : false));
  };

  Settings.prototype.save = function(type) {
    if (type == this.type.CLIENT) {
      for (key in values) {
        Cookies.set(key, values[key]);
      }
      swal("Settings Saved", "Your settings for your client-side preferences have been saved successfully to your browser.", "success");
    }
  };

  Settings.prototype.load = function(type) {

  };

  $client_settings_save.on('click', function(event) {
    event.preventDefault();
    settings.save(settings.type.CLIENT);
  });

  settings.init();
  window.settings = settings;

});
