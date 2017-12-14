var timeFacade = (function(){
  return {
    currentSec: ()  => new Date().getSeconds(),
    currentDate: () => new Date().toJSON().slice(0,10)
  }
})();
