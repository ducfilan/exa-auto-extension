storageFacade.getSettings(function({coinType, noOfTimes, quantityEach, actionClicked}) {
	if (!actionClicked) return;

  var i = 0;
  var intervalID = setInterval(function () {
    if(timeFacade.currentHour() != 21) return;

    var coinDOMHandler = coinDOMHandlerFactory.createCoin(coinType);
    coinDOMHandler.setValue({noOfTimes, quantityEach});
    coinDOMHandler.fillValue();
    coinDOMHandler.triggerBuy();

    if (++i == noOfTimes) window.clearInterval(intervalID);
  }, 1000);
});
