/**
 * Created by sophia.wang on 17/8/30.
 */
'use strict';

/**
 * @ngdoc service
 * @name home.sr
 * @description
 * 测试服务，无操作
 */
angular.module('home.service', []);

angular.module('home.filter', []);

var home = angular.module('home', ['ui.router', 'home.service', 'home.filter']);

home.controller('homeCtrl', function homeCtrl($scope){
    $scope.currentUser = {name: '魏博', id:'se32swr2sls'}
});

home.config(['$stateProvider', function ($stateProvider){
    $stateProvider
        .state('app.home', {
            url: '/home',
            templateUrl: 'views/home/index.html'
        })
}]);

angular.bootstrap(document.getElementById("homeWrapper"),['home']);

