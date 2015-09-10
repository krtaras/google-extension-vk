function getClickHandler() {
    var authUrl = 'https://oauth.vk.com/authorize?client_id=5064446&scope=audio,offline&redirect_uri=http%3A%2F%2Foauth.vk.com%2Fblank.html&display=page&response_type=token';
    chrome.tabs.create({url: authUrl,selected: true}, function(tab) {
      var authTabId = tab.id;
      chrome.tabs.onUpdated.addListener(function tabUpdateListener(tabId, changeInfo) {
         if(tabId == authTabId && changeInfo.url != undefined && changeInfo.status == "loading") {
           if ( changeInfo.url.indexOf('oauth.vk.com/blank.html') > -1 )  {
            console.log(changeInfo.url);
            chrome.tabs.remove(tabId, function() { });
           }
         }
	    });
    });
}

 getClickHandler();