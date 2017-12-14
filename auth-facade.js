var authFacade = (function(){
  var _totp = new OTPAuth.TOTP({
    issuer: 'ACME',
    label: 'AzureDiamond',
    algorithm: 'SHA1',
    digits: 6,
    period: 30
  });

  return {
  	get2FAToken: function(callback) {
  		storageFacade.getSecretCode(function(secretCode) {
        if(!secretCode) return;

  			_totp.secret = OTPAuth.Secret.fromB32(secretCode);
  			callback(_totp.generate());
  		});
  	}
  }
})();
