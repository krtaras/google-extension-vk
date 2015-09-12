(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userAudioController';
    var APIHelper = chrome.extension.getBackgroundPage().APIHelper;
    var AuthController = chrome.extension.getBackgroundPage().AuthController;
    var Player = chrome.extension.getBackgroundPage().Player;
    app.controller(controllerName, ["$scope", "$sce",
        function UserAudioController($scope, $sce) {
            $scope.userAudios = [];
            $scope.audioAlbums = [];
            $scope.activeAlbumId = -1;
            
            $scope.position = 0;
            $scope.name = "";
            
            $scope.updateAlbums = function() {
                APIHelper.getAudioAlbums(AuthController.getCurrentUserId(), AuthController.getAccessToken(), function(data){
                    $scope.$apply(function(){
                        $scope.audioAlbums = data.response.items;
                    });
                });
            }
            
            $scope.updateAudios = function(albumId, index) {
                $scope.activeAlbumId = index;
                APIHelper.getAlbumAudios(AuthController.getCurrentUserId(), AuthController.getAccessToken(), albumId, function(data){
                    $scope.$apply(function(){
                        $scope.userAudios = data.response.items;
                        Player.init($scope.userAudios, true, function(position) {
                            $scope.$apply(function () {
                                $scope.position = position;
                            })
                        });
                    });
                });
            }
            
            $scope.playSound = function(soundId) {
                Player.playSound(soundId);
            }
            
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
            $scope.updateAlbums();
        }
    ]);
})();