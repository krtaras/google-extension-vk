(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userNewsController';
    var APIHelper = chrome.extension.getBackgroundPage().APIHelper;
    var AuthController = chrome.extension.getBackgroundPage().AuthController;
    app.controller(controllerName, ["$scope", 
        function UserNewsController($scope) {
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
            $scope.getNews();
        }
    ]);
})();