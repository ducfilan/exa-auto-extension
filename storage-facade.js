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
		},
    getSettings: function(callback) {
			chrome.storage.sync.get({
				settings: null
			}, function(items) {
				if(callback) callback(items.settings);
			});
		},
		setSettings: function(newSettings, callback) {
			chrome.storage.sync.set({
        settings: newSettings
      }, function() {
				if(callback) callback();
			});
		}
	}
})();
