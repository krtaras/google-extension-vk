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

	this.loadUserAudio = function(scope) {
		VkAPIHelper.getUserAudio(VKAuthController.getCurrentUserId(), VKAuthController.getAccessToken(), function(data){
			scope.$apply(function(){
				scope.userAudios = data.response.items;
			});
		});
	}

	var setCurrentUser = function(data) {
		currentUser = data.response[0];
	}
})();
BackgroundService.reconect();




