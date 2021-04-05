chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#1F45DF'}, function() {
    console.log("The color is blue.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
	  new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlMatches: 'http://*/*'},
      }),
	  new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlMatches: 'https://*/*'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
