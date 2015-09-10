var VKAuthController = function () {
	
	var access_token = "";
	
	this.connect = function () {
		var clientId = "client_id=5064446";
		var scope = "scope=audio,offline";
		var redirectUrl = "redirect_uri=http%3A%2F%2Foauth.vk.com%2Fblank.html";
		var authUrl = 'https://oauth.vk.com/authorize?' + clientId + '&' + scope + '&' + redirectUrl + '&display=page&response_type=token';	
		chrome.tabs.create({ url: authUrl, selected: true }, function (tab) {
			var authTabId = tab.id;
			chrome.tabs.onUpdated.addListener(function tabUpdateListener(tabId, changeInfo) {
				if (tabId == authTabId && changeInfo.url != undefined && changeInfo.status == "loading") {
					if (changeInfo.url.indexOf('oauth.vk.com/blank.html') > -1) {
						console.log(changeInfo.url);
						console.log(getTokenFromURL(changeInfo.url));
						chrome.tabs.remove(tabId, function () { });
					}
				}
			});
		});
	}
	
	var getTokenFromURL = function(url) {
		var startIndex = url.indexOf("access_token=");
		var endIndex = url.indexOf("expires_in");
		url = url.substring(startIndex, endIndex);
		url = url.replace("access_token=","");
		return url;
	}
}