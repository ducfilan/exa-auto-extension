class CoinDOMHandler {
	setValue({noOfTimes, quantityEach}) {
		this._noOfTimes = noOfTimes;
		this._quantityEach = quantityEach;
	}

  fillReactInput(target, val) {
    target = target[0];
  	var event = document.createEvent("HTMLEvents");
  	target.value = val;
  	event.initEvent("input", true, true);
  	target.dispatchEvent(event);
  }
}

class BTCDOMHandler extends CoinDOMHandler {
	fillValue() {
    super.fillReactInput($('.crd-icobuy').eq(0).find('.c251.c258').eq(0), this._quantityEach);
    authFacade.get2FAToken(token => super.fillReactInput($('.crd-icobuy').eq(0).find('.c251.c258').eq(3), token));
	}

  triggerBuy() {
    $('.crd-icobuy').eq(0).find('.frm-btn button').trigger('click');
  }

  isBuyButtonEnable() {
    return !$('.crd-icobuy').eq(0).find('.frm-btn button').prop('disabled');
  }
}

class EthDOMHandler extends CoinDOMHandler {
	fillValue() {
    super.fillReactInput($('.crd-icobuy').eq(1).find('.c251.c258').eq(0), this._quantityEach);
    authFacade.get2FAToken(token => super.fillReactInput($('.crd-icobuy').eq(1).find('.c251.c258').eq(3), token));
	}

  triggerBuy() {
    $('.crd-icobuy').eq(1).find('.frm-btn button').trigger('click');
  }

  isBuyButtonEnable() {
    return !$('.crd-icobuy').eq(0).find('.frm-btn button').prop('disabled');
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
