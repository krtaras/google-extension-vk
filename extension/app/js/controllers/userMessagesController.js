(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userMessagesController';
    var APIHelper = chrome.extension.getBackgroundPage().APIHelper;
    var AuthController = chrome.extension.getBackgroundPage().AuthController;
    app.controller(controllerName, ["$scope",
        function UserMessagesController($scope) {
            $scope.dialogs = [];
            $scope.getUserDialogs = function () {
                APIHelper.getDialogs(AuthController.getCurrentUserId(), AuthController.getAccessToken(), function (data) {
                    $scope.$apply(function () {
                        console.log(data.response);
                        $scope.dialogs = data.response.items;
                        console.log($scope.dialogs);
                    });
                });
            }

            $scope.getDialogConvertedItem = function (dialog) {
                var result = {
                    id: -1,
                    photo: "",
                    title: "",
                    unread: ""
                }
                if (dialog.type == "msg") {
                    var userDialog = dialog.object[0];
                    result.id = userDialog.id;
                    result.photo = userDialog.photo_50;
                    result.title = userDialog.first_name + ' ' + userDialog.last_name;
                    if (dialog.unread) {
                        result.unread = "+" + dialog.unread + "";
                    }
                }
                if (dialog.type == "chat") {
                    var chatDialog = dialog.object;
                    result.id = chatDialog.id;
                    var index = Math.floor((Math.random() * (chatDialog.users.length - 1)) + 0);
                    result.photo = chatDialog.users[index].photo_50;
                    result.title = chatDialog.title;
                    if (dialog.unread) {
                        result.unread = dialog.unread + "";
                    }
                }

                return result;
            }

            $scope.getUserDialogs();
        }
    ]);
})();