(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userProfileInfoController';
    var background = chrome.extension.getBackgroundPage();
    app.controller(controllerName, ["$scope", 
        function UserProfileController($scope) {
            $scope.userProfilePhoto = background.BackgroundService.getMyImgUrl();
            $scope.includeURL = "/app/view/empty.html";
            $scope.openMyAudio = function() {
                $scope.includeURL = "/app/view/audioList.html";
            }
        }
    ]);
})();