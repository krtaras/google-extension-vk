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
            $scope.range = 0;
            $scope.volume = 50;
            
            $scope.rangeInFocus = false;
            $scope.volumeInFocus = false;
            
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
                    });
                });
            }
            
            $scope.updateSoundPosition = function() {
                Player.updatePosition($scope.range);
                $scope.rangeInFocus = false;
            }
            
            $scope.updatePlayerVolume = function() {
                Player.updateVolume($scope.volume);
                $scope.volumeInFocus = false;
            }
            
            $scope.playSound = function(soundId) {
                Player.setPlayList($scope.userAudios);
                Player.playSound(soundId);
            }
            
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
            
            $scope.updateAlbums();
            Player.init(
                function(position, max, name, volume) {
                    $scope.$apply(function () {
                        var range = (position * 10000) / max;
                        var time = position;
                        $scope.position = time;
                        $scope.name = name;
                        if (!$scope.rangeInFocus) {
                            $scope.range = range;
                        }
                        if (!$scope.volumeInFocus) {
                            $scope.volume = volume;
                        }
                        console.log($scope.range);
                    });
                }
            );
        }
    ]);
})();