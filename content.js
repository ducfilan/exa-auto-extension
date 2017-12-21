storageFacade.getSettings(function({coinType, noOfTimes, quantityEach, variantEach, actionClicked}) {
	if (!actionClicked) return;

  var i = 0;
  var intervalID = setInterval(function () {
    var coinDOMHandler = coinDOMHandlerFactory.createCoin(coinType);

    if(timeFacade.currentHour() != constants.buyHour || !coinDOMHandler.isBuyButtonEnable()) return;

    coinDOMHandler.setValue({noOfTimes, quantityEach, variantEach});
    coinDOMHandler.fillValue();
    coinDOMHandler.triggerBuy();

    if (coinDOMHandler.isBuyButtonEnable() && !coinDOMHandler.isError() && ++i == noOfTimes) window.clearInterval(intervalID);
  }, constants.countdownEvery_ms);
});
