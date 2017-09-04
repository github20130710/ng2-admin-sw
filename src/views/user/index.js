/**
 * Created by sophia.wang on 17/8/31.
 */
'use strict';

var user = angular.module('user', ['ui.router']);

user.controller('userCtrl', function userCtrl($scope){
    $scope.huadian = [
        {name: '魏博', id:'1'},
        {name: '何鹏', id:'2'},
        {name: '郭智超', id:'3'}
    ];

});

user.controller('userDetailCtrl', function userDetailCtrl($scope, $stateParams){
    $scope.name = $stateParams.name;
});

user.config(['$stateProvider', function ($stateProvider){
    $stateProvider
        .state('app.user', {
            url: '/user',
            templateUrl: 'views/user/index.html'
        })
        .state('app.user.detail', {
            url: '/user_detail:name',
            templateUrl: 'views/user/detail.html'
        });
}]);

angular.bootstrap(document.getElementById("userWrapper"),['user']);