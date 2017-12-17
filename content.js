storageFacade.getSettings(function({coinType, noOfTimes, quantityEach, actionClicked}) {
	if (!actionClicked) return;

  var i = 0;
  var intervalID = setInterval(function () {
    if(timeFacade.currentHour() != constants.buyHour) return;

    var coinDOMHandler = coinDOMHandlerFactory.createCoin(coinType);
    coinDOMHandler.setValue({noOfTimes, quantityEach});
    coinDOMHandler.fillValue();
    coinDOMHandler.triggerBuy();

    if (++i == noOfTimes) window.clearInterval(intervalID);
  }, constants.countdownEvery_ms);
});
