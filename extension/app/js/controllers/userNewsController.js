(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userNewsController';
    var APIHelper = chrome.extension.getBackgroundPage().APIHelper;
    var AuthController = chrome.extension.getBackgroundPage().AuthController;
    app.controller(controllerName, ["$scope", "$sce",
        function UserNewsController($scope,  $sce) {
           window.name = "WallNews";
           $scope.news = [];
           $scope.getNews = function() {
                APIHelper.getNews(AuthController.getCurrentUserId(), AuthController.getAccessToken(), function(data){
                    $scope.$apply(function(){
                        $scope.news = data.response.items;
                        console.log($scope.news);
                    });
                });
            }
            
            $scope.getAttachmentImage = function (attachments) {
                if (typeof attachments !== "undefined" && attachments.length > 0) {
                    var object = attachments[0];
                    switch (object.type) {
                        case "photo":
                            return object.photo.photo_130;
                        case "posted_photo":
                            return object.posted_photo.photo_130;
                        case "graffiti":
                            return object.graffiti.photo_200;
                        case "link":
                            if (object.link.photo) {
                                return object.link.photo.photo_130;
                            } else {
                                return "";
                            }
                        case "app":
                            return object.app.photo_130;
                        case "album":
                            return object.album.thumb.photo_130;
                        default:
                            return "";
                    }
                }
                return "";
            }
            
            $scope.trustHTML = function(html) {
                return $sce.trustAsHtml(html);
            }
            
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
            $scope.getNews();
        }
    ]);
})();