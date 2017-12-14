var storageFacade = (function() {
	return {
		getSecretCode: function(callback) {
			chrome.storage.sync.get({
				secretCode: null
			}, function(items) {
				if(callback) callback(items.secretCode);
			});
		},
		setSecretCode: function(newVal, callback) {
			chrome.storage.sync.set({
				secretCode: newVal
			}, function() {
				if(callback) callback();
			});
		}
	}
})();
