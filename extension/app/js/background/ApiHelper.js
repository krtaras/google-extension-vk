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
	
	this.getMessagesFromDialog = function(userId, access_token, dialogType, dialogId, callbackFunc) {
		var url = "https://api.vk.com/method/execute.getChatMessages?owner_id=" + userId + "&type=" + dialogType + "&dialog_id=" + dialogId + "&access_token=" + access_token + "&count=200&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	this.getFriends = function(userId, access_token, callbackFunc) {
		var url = "https://api.vk.com/method/friends.get?user_id=" + userId + "&fields=photo_50&order=hints&access_token=" + access_token + "&v=5.37";
		callMethod(url, callbackFunc);
	}
	
	this.sendMessage = function(dialogId, dialogType, message, access_token, callbackFunc) {
		var identificator = "";
		if (dialogType == "msg") {
			identificator = "user_id=" + dialogId;
		}
		if (dialogType == "chat") {
			identificator = "chat_id=" + dialogId;
		}
		if (identificator != "") {
			var url = "https://api.vk.com/method/messages.send?" + identificator + "&message=" + message + "&access_token=" + access_token + "&v=5.37";
			console.log(url);
			callMethod(url, callbackFunc);
		}
	}
	
	var callMethod = function(url, callbackFunc) {
		$.get(url, function(data){
			callbackFunc(data);
		}, "json");
	};
})();