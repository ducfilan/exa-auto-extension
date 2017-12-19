class CoinDOMHandler {
	setValue({noOfTimes, quantityEach, variantEach}) {
		this._noOfTimes = parseInt(noOfTimes);
		this._quantityEach = parseInt(quantityEach);
		this._variantEach = Math.floor(Math.random()*(parseInt(variantEach)*2+1)-parseInt(variantEach));
	}

  fillReactInput(target, val) {
  	var event = document.createEvent("HTMLEvents");
  	target.value = val;
  	event.initEvent("input", true, true);
  	target.dispatchEvent(event);
  }
}

class BTCDOMHandler extends CoinDOMHandler {
	fillValue() {
    super.fillReactInput($('.crd-icobuy').eq(0).find('input').eq(0)[0], this._variantEach + this._quantityEach);
    authFacade.get2FAToken(token => super.fillReactInput($('.crd-icobuy').eq(0).find('input').eq(3)[0], token));
	}

  triggerBuy() {
    $('.crd-icobuy').eq(0).find('.frm-btn button').trigger('click');
  }

  isBuyButtonEnable() {
    return !$('.crd-icobuy').eq(0).find('.frm-btn button').prop('disabled');
  }

  isError(){
    return $('.frm-tf p').eq(2).text().includes(constants.failedMessage);
  }
}

class EthDOMHandler extends CoinDOMHandler {
	fillValue() {
    super.fillReactInput($('.crd-icobuy').eq(1).find('input').eq(0)[0], this._variantEach + parseInt(this._quantityEach));
    authFacade.get2FAToken(token => super.fillReactInput($('.crd-icobuy').eq(1).find('input').eq(3)[0], token));
	}

  triggerBuy() {
    $('.crd-icobuy').eq(1).find('.frm-btn button').trigger('click');
  }

  isBuyButtonEnable() {
    return !$('.crd-icobuy').eq(0).find('.frm-btn button').prop('disabled');
  }

  isError(){
    return $('.frm-tf p').eq(7).text().includes(constants.failedMessage);
  }
}

var coinDOMHandlerFactory = (function() {
	return {
    createCoin: function(coinType) {
      switch (coinType) {
        case 'BTC':
          return new BTCDOMHandler();
        case 'ETH':
          return new EthDOMHandler();
      }
    }
  }
})();
