/**
 * Created by sophia.wang on 17/8/28.
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.currentPage = toState;
                    $rootScope.previousPage = fromState;
                });
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider,   $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/app');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'theme/app.html'
                    })
            }
        ]
    );