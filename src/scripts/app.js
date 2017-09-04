/**
 * Created by sophia.wang on 17/8/28.
 */
'use strict';
angular.module('app', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ui.bootstrap'
])
.controller('AppCtrl', appCtrl);
function appCtrl($scope){

    //config
    $scope.app = {
        name: 'SkyForm',
        version: '5.0',
        color: 'green'
    };
}