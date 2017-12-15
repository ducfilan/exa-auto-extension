var formMan = (function(){
  return {
		loadForm: function(secretCode) {
			if (secretCode) {
        $('.secret-form__input-text').val(secretCode);
				$('.secret-form').addClass('hidden');
				$('.info-form').removeClass('hidden');
				$('.config-form').removeClass('hidden');
				$('.button-action').removeClass('hidden');
			} else {
        $('.info-form').addClass('hidden');
        $('.config-form').addClass('hidden');
        $('.button-action').addClass('hidden');
				$('.secret-form').removeClass('hidden');
        $('.secret-form__input-text').focus().select();
			}
		}
  }
})();
