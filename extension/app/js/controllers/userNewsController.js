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
           $scope.profiles = [];
           $scope.getNews = function() {
                $('#news-loadin').html(getSpinnerHtml());
                APIHelper.getNews(AuthController.getCurrentUserId(), AuthController.getAccessToken(), function(data){
                    $scope.$apply(function(){
                        $scope.news = data.response.items;
                        var userProfiles = data.response.profiles;
                        var groupProfiles = data.response.groups;
                        for (var i in userProfiles) {
                            $scope.profiles.push({
                                id:userProfiles[i].id,
                                name:userProfiles[i].first_name + ' ' + userProfiles[i].last_name
                            });
                        }
                        for (var i in groupProfiles) {
                            $scope.profiles.push({
                                id:groupProfiles[i].id,
                                name:groupProfiles[i].name
                            });
                        }
                        $('#news-loadin').html("");
                    });
                });
            }
            
            $scope.getPostTitle = function(sourceId) {
                if (sourceId < 0) {
                    sourceId = -1 * sourceId;
                }
                for (var i in $scope.profiles) {
                    if ($scope.profiles[i].id == sourceId) {
                        return $scope.profiles[i].name;
                    }
                }
                return "";
            }
            
            $scope.getAttachmentImage = function (post) {
                var attachments = post.attachments;
                if (typeof post.copy_history !== "undefined" && post.copy_history.length > 0) {
                    attachments = post.copy_history[0].attachments;
                }
                if (typeof attachments !== "undefined" && attachments.length > 0) {
                    var object = attachments[0];
                    switch (object.type) {
                        case "photo":
                            return object.photo.photo_604;
                        case "posted_photo":
                            return object.posted_photo.photo_604;
                        case "graffiti":
                            return object.graffiti.photo_586;
                        case "link":
                            if (object.link.photo) {
                                return object.link.photo.photo_604;
                            } else {
                                return "";
                            }
                        case "app":
                            return object.app.photo_604;
                         case "video":
                            return object.video.photo_320;
                        case "album":
                            return object.album.thumb.photo_604;
                        default:
                            return "";
                    }
                }
                return "";
            }
            
            $scope.getPostText = function(post) {
                var text = post.text;
                if (typeof post.copy_history !== "undefined" && post.copy_history.length > 0) {
                    text += '\n' + post.copy_history[0].text;
                }
                return $scope.trustHTML(text);
            }
            
            $scope.openPost = function(postUrl) {
                chrome.tabs.create({ url: postUrl, active: false });
                return false;
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