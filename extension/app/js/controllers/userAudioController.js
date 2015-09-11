(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userAudioController';
    var background = chrome.extension.getBackgroundPage();
    app.controller(controllerName, ["$scope", "$sce", 
        function UserAudioController($scope, $sce) {
            $scope.userAudios = [];
            background.BackgroundService.loadUserAudio($scope);
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
        }
    ]);
})();