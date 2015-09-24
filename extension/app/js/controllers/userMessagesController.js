(function () {
    'use strict';
    var app = angular.module('googleExtensionVK');
    var controllerName = 'userMessagesController';
    var APIHelper = chrome.extension.getBackgroundPage().APIHelper;
    var AuthController = chrome.extension.getBackgroundPage().AuthController;
    app.controller(controllerName, ["$scope", "$sce",
        function UserMessagesController($scope, $sce) {
            $scope.dialogs = [];
            $scope.dialogMessages = [];
            $scope.dialogUsers = [];
            
            $scope.selectedDialog = -1;
            
            $scope.friends = [];
            $scope.selectedFriendId = -1;
            
            $scope.getFriends = function() {
                APIHelper.getFriends(AuthController.getCurrentUserId(), AuthController.getAccessToken(), function (data) {
                    $scope.$apply(function () {
                        console.log(data.response);
                        $scope.friends = data.response.items;
                    });
                });
            }
            
            $scope.selectFriend = function(friendId) {
                $scope.selectedFriendId = friendId;
            }
            
            $scope.getUserDialogs = function () {
                APIHelper.getDialogs(AuthController.getCurrentUserId(), AuthController.getAccessToken(), function (data) {
                    $scope.$apply(function () {
                        $scope.dialogs = data.response.items;
                    });
                });
            }

            $scope.getDialogMessages = function(dialogId, dialogType) {
                $scope.selectedDialog = dialogId;
                APIHelper.getMessagesFromDialog(AuthController.getCurrentUserId(), AuthController.getAccessToken(), dialogType, dialogId, function (data) {
                    $scope.$apply(function () {
                        console.log(data.response);
                        $scope.dialogMessages = data.response.items;
                        $scope.dialogUsers = data.response.users;
                    });
                });
            }
            
            $scope.getConvertedMessage = function(msg) {
                var result = {
                    title: "",
                    time: "",
                    text: "",
                    attachmentHTML: ""
                }
                for (var i in $scope.dialogUsers) {
                    var user = $scope.dialogUsers[i];
                    if (user.id == msg.owner) {
                        result.title = user.first_name + " " + user.last_name;
                        break;
                    }
                }
                result.text = msg.text;
                var attachmentHTML = "";
                if (msg.attachments) {
                    var attachments = msg.attachments;
                    for (var i in attachments) {
                        var object = attachments[i];
                        if (object.type == "photo") {
                            attachmentHTML += '<a href="" ><img src="' + object.photo.photo_604 + '" /></a>'
                        }
                    }
                }
                result.attachmentHTML = $scope.trustHTML(attachmentHTML);
                return result;
            }
            
            $scope.getDialogConvertedItem = function (dialog) {
                var result = {
                    type: "",
                    id: -1,
                    photo: "",
                    title: "",
                    unread: ""
                }
                result.type = dialog.type;
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
            
            $scope.trustHTML = function(html) {
                return $sce.trustAsHtml(html);
            }
            
            $scope.getFriends();
            $scope.getUserDialogs();
            $('#dialogs-msgs').bind('DOMNodeInserted DOMSubtreeModified ', function(event) {
                var objDiv = document.getElementById("dialogs-msgs");
                objDiv.scrollTop = objDiv.scrollHeight;
            });
        }
    ]);
})();