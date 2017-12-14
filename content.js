chrome.storage.sync.get({
    secretCode: null
}, function(items) {
    formMan.loadForm(items.secretCode);
});
