storageFacade.getSettings(function({coinType, noOfTimes, quantityEach, actionClicked}) {
	if (!actionClicked) return;

  var i = 0;
  var intervalID = setInterval(function () {
    if(timeFacade.currentHour() != constants.buyHour) return;

    var coinDOMHandler = coinDOMHandlerFactory.createCoin(coinType);
    coinDOMHandler.setValue({noOfTimes, quantityEach});
    var variant = Math.floor(Math.random()*21-10);
    coinDOMHandler.fillValue(variant);
    coinDOMHandler.triggerBuy();

    if (coinDOMHandler.isBuyButtonEnable() && !coinDOMHandler.isError() && ++i == noOfTimes) window.clearInterval(intervalID);
  }, constants.countdownEvery_ms);
});
