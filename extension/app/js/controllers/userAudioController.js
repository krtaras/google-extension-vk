(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userAudioController';
    var APIHelper = chrome.extension.getBackgroundPage().APIHelper;
    var AuthController = chrome.extension.getBackgroundPage().AuthController;
    var Player = chrome.extension.getBackgroundPage().Player;
    app.controller(controllerName, ["$scope", "$sce",
        function UserAudioController($scope, $sce) {
            window.name = "AudioPlayer";
            $scope.albumTracks = [];
            $scope.audioAlbums = [];

            $scope.activeAlbumId = -2;
            $scope.activeTrackId = -2;
            
            $scope.position = 0;
            $scope.name = "";
            $scope.range = 0;
            $scope.volume = 50;
            $scope.tmpVomule = 0;
            $scope.isPlaying = false;
            $scope.isStoped = true;
            
            $scope.rangeInFocus = false;
            $scope.volumeInFocus = false;
            
            $scope.updateAlbums = function() {
                APIHelper.getAudioAlbums(AuthController.getCurrentUserId(), AuthController.getAccessToken(), function(data){
                    $scope.$apply(function(){
                        $scope.audioAlbums = data.response.items;
                    });
                });
            }
            
            $scope.updateAudios = function(albumId) {
                $scope.activeAlbumId = albumId;
                APIHelper.getAlbumTracks(AuthController.getCurrentUserId(), AuthController.getAccessToken(), albumId, function(data){
                    $scope.$apply(function(){
                        $scope.albumTracks = data.response.items;
                    });
                });
            }
            
            $scope.updateTrackPosition = function() {
                Player.updatePosition($scope.range);
                $scope.rangeInFocus = false;
            }
            
            $scope.updatePlayerVolume = function() {
                Player.updateVolume($scope.volume);
                $scope.volumeInFocus = false;
            }
            
            $scope.playTrack = function(trackId) {
                $scope.name = "loading..."
                $scope.activeTrackId = trackId;
                Player.setPlayList($scope.albumTracks, $scope.activeAlbumId);
                Player.playTrack(trackId);
            }
            
            $scope.playNext = function() {
                $scope.name = "loading..."
                Player.next();
                $scope.pageRefresh();
            }
            
            $scope.playBack = function() {
                $scope.name = "loading..."
                Player.prev();
                $scope.pageRefresh();
            }
            
            $scope.stopPlay = function() {
                $scope.isPlaying = false;
                $scope.isStoped = true;
                Player.stop();
            }
            
            $scope.play = function() {
                $scope.name = "loading..."
                Player.setPlayList($scope.albumTracks, $scope.activeAlbumId);
                Player.playTrack($scope.activeTrackId);
            }
            
            $scope.togglePlay = function() {
                if ($scope.isStoped && $scope.activeTrackId > 0) {
                    $scope.play();
                    $scope.isStoped = false;
                } else {
                    $scope.isPlaying = !$scope.isPlaying;
                    Player.toggle();
                }
            }
            
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
            
            $scope.pageRefresh = function() {
                var state = Player.getState();
                $scope.activeAlbumId = state.selectedAlbumId;
                $scope.activeTrackId = state.selectedTrackId;
                $scope.name = state.displayName;
                $scope.updateAlbums();
                if ($scope.activeAlbumId != -2) {
                    $scope.updateAudios($scope.activeAlbumId);
                }
                if (state.isOnPause) {
                    $scope.isStoped = false;
                }
                Player.init(
                    function(state) {
                        $scope.$apply(function () {
                            var range = (state.position * 10000) / state.duration;
                            var time = state.position;
                            $scope.position = time;
                            $scope.name = state.displayName;
                            $scope.activeTrackId = state.selectedTrackId;
                            if (!$scope.rangeInFocus) {
                                $scope.range = range;
                            }
                            if (!$scope.volumeInFocus) {
                                $scope.volume = state.volume;
                            }
                            $scope.isPlaying = true;
                            $scope.isStoped = false;
                            console.log($scope.range);
                        });
                    }
                );
            }
            $scope.pageRefresh();
        }
    ]);
})();