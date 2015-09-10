var background = chrome.extension.getBackgroundPage();
var app = angular.module('googleExtensionVK', []);
app.controller('userProfileInfo', function($scope){
	$scope.userProfilePhoto = background.vk.getMyImgUrl();
});