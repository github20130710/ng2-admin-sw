// config

var app =  
angular.module('app')
  .constant('SERVICE_CONFIG', {
      queryFrequency: 2000,         //毫秒
      casServiceURL : 'http://10.10.182.173:8080/cas'
  })
  .config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        //处理模块间跳转
        $provide.decorator('$state', function($delegate, $ocLazyLoad) {
            var state = {};
            // angular对象还是有些实用的方法的，深拷贝对象算是一个
            // 这里做深拷贝不做浅拷贝是避免循环嵌套调用内存溢出
            angular.copy($delegate, state);
            $delegate.transitionTo = function (to, toParams) {
                // 跳转的时候有两种情况，一种是传入self对象，另一种是直接把state的id传进来
                if (to.self) {
                    // 当to为对象时，读取self.url属性获取路径，因为路径命名遵循"模块/页面"的方式，所以可以轻松判读取模块名
                    //var mod = to.self.name.replace('app.', '').replace(/\/(.*)\/.*/, '$2');
                    var mod = to.self.name.replace('app.', '').split('.')[0];
                    if (!mod || '/' === mod) {
                        mod = 'home';
                    }
                    if(mod.substring(0,1) == '/'){
                        mod = mod.substring(1);
                    }
                    //模块加载完成后再调用默认的路由跳转函数
                    $ocLazyLoad.load(mod).then(function (){
                        state.transitionTo(to.self.name);
                    });
                } else {
                    //var id = to.replace('app.', '').replace(/(([a-z]*)[A-Z]{1})?.*/, '$3');
                    var id = to.replace('app.', '').split('.')[0];
                    $ocLazyLoad.load(id).then(function() {
                        state.transitionTo(to, toParams);
                    });
                }
            };
            return $delegate;
        });
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]);