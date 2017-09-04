'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(['$rootScope', '$ocLazyLoad', '$urlRouter', '$location',
      function ($rootScope, $ocLazyLoad, $urlRouter, $location) {

          // 在$rootScope上监听'$locationChangeSuccess'事件
          // 当用户在浏览器中输入URL地址时触发
          $rootScope.$on('$locationChangeSuccess', function () {
              if(!$location.path()) $location.path('/');
              var mod = $location.path().split('/')[2]||'home';
              // 路由路径按照 "模块/页面" 的方式配置，有两个好处：
              // 1. 避免不同模块的路径冲突
              // 2. 可以通过路径判断模块
              $ocLazyLoad.load(mod).then(function () {
                  $urlRouter.sync();
              });
          });
          $urlRouter.listen();
      }
    ]
  )
    .config(["$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.deferIntercept(false); //禁用延迟location变化的拦截,保持当前的URL去并且推迟一个变化

        $urlRouterProvider
            .otherwise('/app/home');
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'theme/app.html'
            })
    }]);