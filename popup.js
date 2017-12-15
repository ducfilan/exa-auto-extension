var popupModule = (function(){
  var _isTokenLoaded = false;

  return {
    initializeSettings: function() {
    	storageFacade.getSecretCode(formMan.loadForm);
    },
    attachEventToSettings: function() {
    	$('.secret-form__button-set').click(function() {
    		let secretCode = $('.secret-form__input-text').val();
    		let callback   = function() {
    			$('#idOptionSaveStatus').removeClass('hidden');
    			formMan.loadForm($('.secret-form__input-text').val());

    			setTimeout(function() {
    				$('#idOptionSaveStatus').addClass('hidden');
    			}, 750);
    		};

    		storageFacade.setSecretCode(secretCode, callback);
    	});

      $('.header__setting').click(() => formMan.loadForm());
    },
    displayCountDown: function(){
      $('.info-form__countdown').countdown(timeFacade.currentDate() + " 23:00:00", function(event) {
        var totalHours = event.offset.totalDays * 24 + event.offset.hours;
        $(this).text(event.strftime(totalHours + ' h %M m %S s'));
      });
    },
    displayAuthCode: function() {
    	setInterval(function() {
        if(!_isTokenLoaded || timeFacade.currentSec() % 30 == 0){
          authFacade.get2FAToken(token => $('.info-form__2fa-code').text(token));
          _isTokenLoaded = true;
        }
    	}, 100);
    }
  }
})();

document.addEventListener('DOMContentLoaded', function() {
	popupModule.initializeSettings();
	popupModule.attachEventToSettings();
  popupModule.displayCountDown();
	popupModule.displayAuthCode();
});
