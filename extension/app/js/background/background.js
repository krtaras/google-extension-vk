var BackgroundService = new (function() {
	var currentUser;
	var audioPlayer;
	
	this.reconect = function() {
		VKAuthController.connect(setCurrentUser);
	}
	
	this.getMyImgUrl = function() {
		if(typeof currentUser !== "undefined") {
			return currentUser.photo_50;
		}
	}

	this.loadUserAudio = function(updateFunction) {
		VkAPIHelper.getUserAudio(VKAuthController.getCurrentUserId(), VKAuthController.getAccessToken(), updateFunction);
	}

	var setCurrentUser = function(data) {
		currentUser = data.response[0];
	}
})();
BackgroundService.reconect();




