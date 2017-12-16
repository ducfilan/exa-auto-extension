class CoinDOMHandler {
	setValue({noOfTimes, quantityEach}) {
		this._noOfTimes = noOfTimes;
		this._quantityEach = quantityEach;
	}

	fillValue() {}
	triggerBuy() {}
}

class BTCDOMHandler extends CoinDOMHandler {
	fillValue() {
    $('.crd-icobuy').eq(0).find('.c251.c258').eq(0)
      .attr('value', this._quantityEach)
      .val(this._quantityEach);
    authFacade.get2FAToken(token => $('.crd-icobuy').eq(0).find('.c251.c258').eq(3)
      .attr('value', token)
      .val(token));
	}

  triggerBuy() {
    $('.crd-icobuy').eq(0).find('.frm-btn button').trigger('click');
  }
}

class EthDOMHandler extends CoinDOMHandler {
	fillValue() {
    $('.crd-icobuy').eq(1).find('.c251.c258').eq(0)
      .attr('value', this._quantityEach)
      .val(this._quantityEach);
    authFacade.get2FAToken(token => $('.crd-icobuy').eq(1).find('.c251.c258').eq(3)
      .attr('value', token)
      .val(token));
	}

  triggerBuy() {
    $('.crd-icobuy').eq(1).find('.frm-btn button').trigger('click');
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
