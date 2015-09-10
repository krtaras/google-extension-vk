var VK = function() {
	var vkAuthController;
	var currentUser;
	
	this.reconect = function() {
		vkAuthController = new VKAuthController();
		vkAuthController.connect(init);
	}
	
	this.getMyImgUrl = function() {
		if(typeof currentUser !== "undefined") {
			return currentUser.photo_50;
		}
	}
	
	var init = function() {
		console.log("init function..."); //DEBUG LOG
		vkAuthController.getCurrentUser(setCurrentUser);
	}
	
	var setCurrentUser = function(data) {
		currentUser = data.response[0];
	}
}

var vk = new VK();
vk.reconect();




