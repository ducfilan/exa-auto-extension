var popupModule = (function() {
	var _isTokenLoaded = false;

	var _saveSecretHandler = function() {
		$('.secret-form__button-set').click(function() {
			let secretCode = $('.secret-form__input-text').val();
			let callback = function() {
				$('#idOptionSaveStatus').removeClass('hidden');
				formMan.loadForm($('.secret-form__input-text').val());

				setTimeout(function() {
					$('#idOptionSaveStatus').addClass('hidden');
				}, 750);
			};

			storageFacade.setSecretCode(secretCode, callback);
		});
	};

	var _settingClickHandler = function() {
		$('.header__setting').click(() => formMan.loadForm());
	};

  var _closePopup = () => window.close();

  var _restartCurrentTab = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
      var code = 'window.location.reload();';
      chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
  };

	var _actionClickHandler = function() {
		$('.button-action').click(function() {
			storageFacade.setSettings({
        coinType: $('.config-form__coin-type input[name="coinType"]:checked').val(),
        noOfTimes: $('.config-form__input-text.no-of-times').val(),
        quantityEach: $('.config-form__input-text.quantity-each').val(),
        variantEach: $('.config-form__input-text.variant-each').val(),
        actionClicked: true
      }, () => {
        _closePopup();
        _restartCurrentTab();
      });
		});
	};

	return {
		initializeSettings: function() {
			storageFacade.getSecretCode(formMan.loadForm);
      storageFacade.getSettings(formMan.populateSettings);
		},
		attachEventToSettings: function() {
			_saveSecretHandler();
			_settingClickHandler();
			_actionClickHandler();
		},
		displayCountDown: function() {
			$('.info-form__countdown').countdown(timeFacade.currentDate() + " 23:00:00", function(event) {
				var totalHours = event.offset.totalDays * 24 + event.offset.hours;
				$(this).text(event.strftime(totalHours + ' h %M m %S s'));
			});
		},
		displayAuthCode: function() {
			setInterval(function() {
				if (!_isTokenLoaded || timeFacade.currentSec() % 30 == 0) {
					authFacade.get2FAToken(token => $('.info-form__2fa-code').text(token));
					_isTokenLoaded = true;
				}
			}, 1000);
		}
	}
})();

document.addEventListener('DOMContentLoaded', function() {
	popupModule.initializeSettings();
	popupModule.attachEventToSettings();
	popupModule.displayCountDown();
	popupModule.displayAuthCode();
});
