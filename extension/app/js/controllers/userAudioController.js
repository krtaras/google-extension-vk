(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userAudioController';
    var background = chrome.extension.getBackgroundPage();
    app.controller(controllerName, ["$scope", 
        function UserAudioController($scope) {
            $scope.userAudio = ""; 
            var updateUserAudio = function(data) {
                $scope.userAudio = data.response[0];
            }
            background.BackgroundService.loadUserAudio(updateUserAudio);
        }
    ]);
})();