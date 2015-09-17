var APIHelper = new (function() {
	
	this.getUserProfile = function(userId, filds, access_token, callbackFunc) {
		var url = "https://api.vk.com/method/users.get?user_id="+ userId + "&fields=" + filds + "&v=5.37&access_token=" + access_token;
		callMethod(url, callbackFunc);
	},
	
	this.getAlbumTracks = function(userId, access_token, albumId, callbackFunc) {
		var album = "";
		if (albumId > 0) {
			album = "&album_id=" + albumId;
		}
		var url = "https://api.vk.com/method/audio.get?owner_id=" + userId + "&access_token=" + access_token + album + "&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	this.getAudioAlbums = function(userId, access_token, callbackFunc) {
		var url = "https://api.vk.com/method/audio.getAlbums?owner_id=" + userId + "&access_token=" + access_token + "&count=100&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	this.getNews = function(userId, access_token, callbackFunc) {
		var url = "https://api.vk.com/method/newsfeed.get?owner_id=" + userId + "&access_token=" + access_token + "&filters=post&count=100&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	this.getDialogs = function(userId, access_token, callbackFunc) {
		var url = "https://api.vk.com/method/execute.getUserDialogs?owner_id=" + userId + "&access_token=" + access_token + "&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	this.getMessagesFromPrivateChat = function(userId, access_token, dialogId, callbackFunc) {
		var url = "https://api.vk.com/method/messages.getHistory?owner_id=" + userId + "&user_id=" + dialogId + "&access_token=" + access_token + "&count=200&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	this.getMessagesFromGroupChat = function(userId, access_token, dialogId, callbackFunc) {
		var url = "https://api.vk.com/method/messages.getHistory?owner_id=" + userId + "&chat_id=" + dialogId + "&access_token=" + access_token + "&count=200&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	var callMethod = function(url, callbackFunc) {
		$.get(url, function(data){
			callbackFunc(data);
		}, "json");
	};
})();