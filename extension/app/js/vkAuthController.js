var VKAuthController = function () {
	
	var access_token = "";
	var current_user = "";
	
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
						access_token = getTokenFromURL(changeInfo.url);
						current_user = getUserId(changeInfo.url);
						console.log(access_token);
						console.log(current_user);
						chrome.tabs.remove(tabId, function () { });
						getUserImgURL();
					}
				}
			});
		});
	};
	
	var getUserImgURL = function() {
		var url = "https://api.vk.com/method/users.get?user_id="+ current_user + "&v=5.37&access_token=" + access_token;
		$.get(url, function(data){
			console.log(data);
		}, "json");
	};
	
	var getTokenFromURL = function(url) {
		var tmpUrl = url;
		var startIndex = tmpUrl.indexOf("access_token=");
		var endIndex = tmpUrl.indexOf("&expires_in");
		tmpUrl = tmpUrl.substring(startIndex, endIndex);
		tmpUrl = tmpUrl.replace("access_token=","");
		return tmpUrl;
	};
	
	var getUserId = function(url) {
		var tmpUrl = url;
		var startIndex = tmpUrl.indexOf("user_id=");
		var endIndex = tmpUrl.length;
		tmpUrl = tmpUrl.substring(startIndex, endIndex);
		tmpUrl = tmpUrl.replace("user_id=","");
		return tmpUrl;
	};
}