(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userProfileInfoController';
    var background = chrome.extension.getBackgroundPage();
    app.controller(controllerName, ["$scope", 
        function UserProfileController($scope) {
            window.name = "UserInfo";
            $scope.userProfilePhoto = background.BackgroundService.getMyImgUrl();
            $scope.includeURL = "/app/view/empty.html";
            $scope.openMyInfo = function() {
                $scope.includeURL = "/app/view/empty.html";
            }
            $scope.openMyMessages = function() {
                $scope.includeURL = "/app/view/messages.html";
            }
            $scope.openMyAudios = function() {
                $scope.includeURL = "/app/view/audios.html";
            }
             $scope.openMyNews = function() {
                $scope.includeURL = "/app/view/news.html";
            }
            $scope.openMySettings = function() {
                $scope.includeURL = "/app/view/settings.html";
            }
        }
    ]);
})();