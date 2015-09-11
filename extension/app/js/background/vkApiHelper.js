var VkAPIHelper = new (function() {
	
	this.getUserProfile = function(userId, filds, access_token, callbackFunc) {
		var url = "https://api.vk.com/method/users.get?user_id="+ userId + "&fields=" + filds + "&v=5.37&access_token=" + access_token;
		callMethod(url, callbackFunc);
	},
	
	this.getUserAudio = function(userId, access_token, callbackFunc) {
		var url = "https://api.vk.com/method/audio.get?owner_id=" + userId + "&access_token=" + access_token + "&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	var callMethod = function(url, callbackFunc) {
		$.get(url, function(data){
			callbackFunc(data);
		}, "json");
	};
})();