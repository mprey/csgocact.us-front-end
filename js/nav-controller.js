jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var $L = 955,
		$menu_navigation = $('#main-nav'),
		$cart_trigger = $('#user-trigger'),
		$hamburger_icon = $('#hamburger-menu'),
		$lateral_cart = $('#user-menu'),
		$shadow_layer = $('#shadow-layer'),
		$notification_counter = $('.notification-counter'),
		$chat_trigger = $('#chat-trigger-a'),
		$lateral_chat = $('#chat-box');

	$chat_trigger.on('click', function(event) {
		event.preventDefault();
		var val = parseInt($notification_counter.text());
    val++;

    $notification_counter.css({opacity: 0}).text(val).css({top: '-10px'}).transition({top: '-2px', opacity: 1});
	});

	//open lateral menu on mobile
	$hamburger_icon.on('click', function(event) {
		event.preventDefault();
		//close all lateral menus
		$lateral_cart.removeClass('speed-in');
		$lateral_chat.removeClass('speed-in');
		togglePaneVisibility($menu_navigation, $shadow_layer, $('body'));
	});

	//open cart
	$cart_trigger.on('click', function(event) {
		event.preventDefault();
		//close all lateral menus
		$menu_navigation.removeClass('speed-in');
		$lateral_chat.removeClass('speed-in');
		togglePaneVisibility($lateral_cart, $shadow_layer, $('body'));
	});

	$chat_trigger.on('click', function(event) {
		event.preventDefault();

		//close all lateral menus
		$lateral_cart.removeClass('speed-in');
		$menu_navigation.removeClass('speed-in');
		togglePaneVisibility($lateral_chat, $shadow_layer, $('body'));
	});

	//close lateral cart, lateral menu, or lateral chat
	$shadow_layer.on('click', function(){
		$shadow_layer.removeClass('is-visible');
		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if ($lateral_cart.hasClass('speed-in')) {
			$lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$menu_navigation.removeClass('speed-in');
			$lateral_chat.removeClass('speed-in');
		} else if ($menu_navigation.hasClass('speed-in')) {
			$menu_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$lateral_cart.removeClass('speed-in');
			$lateral_chat.removeClass('speed-in');
		} else {
			$lateral_chat.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$lateral_cart.removeClass('speed-in');
			$menu_navigation.removeClass('speed-in');
		}
	});

	$(document).keyup(function(e) {
  	if (e.keyCode === 13) { //enter key
			//TODO add chat input sent
		}
  	if (e.keyCode === 27) { //esc key
			$shadow_layer.click();
		}
	});

	//move #main-navigation inside header on laptop
	//insert #main-navigation after header on mobile
	moveNavigation( $menu_navigation, $L);
	$(window).on('resize', function(){
		moveNavigation( $menu_navigation, $L);

		if( $(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
			$menu_navigation.removeClass('speed-in');
			$shadow_layer.removeClass('is-visible');
			$('body').removeClass('overflow-hidden');
		}

	});
});

function togglePaneVisibility ($lateral_panel, $background_layer, $body) {
	if( $lateral_panel.hasClass('speed-in') ) {
		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		$lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$body.removeClass('overflow-hidden');
		});
		$background_layer.removeClass('is-visible');

	} else {
		$lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$body.addClass('overflow-hidden');
		});
		$background_layer.addClass('is-visible');
	}
}

function moveNavigation( $navigation, $MQ) {
	if ( $(window).width() >= $MQ ) {
		$navigation.detach();
		$navigation.appendTo('header');
	} else {
		$navigation.detach();
		$navigation.insertAfter('header');
	}
}
