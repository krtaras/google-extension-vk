(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userAudioController';
    var VkAPIHelper = chrome.extension.getBackgroundPage().VkAPIHelper;
    var VKAuthController = chrome.extension.getBackgroundPage().VKAuthController;
    var Player = chrome.extension.getBackgroundPage().Player;
    app.controller(controllerName, ["$scope", "$sce", 
        function UserAudioController($scope, $sce) {
            $scope.userAudios = [];
            $scope.updateAudios = function() {
                VkAPIHelper.getUserAudio(VKAuthController.getCurrentUserId(), VKAuthController.getAccessToken(), function(data){
                    $scope.$apply(function(){
                        $scope.userAudios = data.response.items;
                        Player.init($scope.userAudios, true);
                        Player.play();
                    });
                });
            }
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
            $scope.updateAudios();
        }
    ]);
})();