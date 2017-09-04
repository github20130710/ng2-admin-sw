'use strict';
/**
 * Created by sophia.wang on 17/3/29.
 */
angular.module('sf.console', [])
    .directive('sfState', function($compile, SERVICE_CONFIG) {
        return {
            restrict: 'AE',
            scope:{
                module:'@',
                type:'@',
                value:'='
            },
            replace:true,
            template:'<span style="float:none;" class="badge {{iClass}}">{{stateName}}</span>',
            link: function(scope, elem, attrs){

                scope.stateName = scope.value;

                scope.$watch('value', function(n){
                    transferState(scope.module, scope.type, n);
                    $compile(elem.contents())(scope);
                });

                function transferState(module, type, value){

                    if(SERVICE_CONFIG['module_'+module]){
                        var arr = SERVICE_CONFIG['module_'+module][type];
                        angular.forEach(arr, function(item, key){
                            if(item && item.name == value){
                                scope.stateName = item.value;
                            }
                        });
                    }

                    if(value == 'Running' || value == 'Enabled' || value == 'Ready' || value == 'active'
                        || value == 'Connected') {
                        scope.iClass = 'bg-success';
                    } else if(value == 'Connecting' || value == 'Starting' || value == 'Stopping' || value == 'Rebooting'
                        || value == 'Migrating' || value == 'Destroying' || value == 'PreMaintenance'
                        || value == 'Maintenance' || value == 'warning' || value == 'NotInstantiated') {
                        scope.iClass = 'bg-warning';
                    } else if(value == 'Stopped' || value =='fault') {
                        scope.iClass = 'bg-danger';
                    } else if(value =='serious'){
                        scope.iClass = 'bg-serious';
                    } else if(value == 'Disconnected' || value == 'Disabled' || value == 'Destroyed'){
                        scope.iClass = 'bg-empty';
                    } else if(value == 'attention'){
                        scope.iClass = 'bg-attention';
                    } else {
                        scope.iClass = 'bg-base-light';
                    }
                }
            }
        }
    })
    .directive('sfFilter', function($compile, SERVICE_CONFIG) {
        return {
            restrict: 'AE',
            scope:{
                module:'@',
                type:'@',
                value:'='
            },
            replace:true,
            template:'<span style="float:none;" >{{stateName}}</span>',
            link: function(scope, elem, attrs){

                scope.stateName = scope.value;

                scope.$watch('value', function(n){
                    transferState(scope.module, scope.type, n);
                    $compile(elem.contents())(scope);
                });

                function transferState(module, type, value){

                    if(SERVICE_CONFIG['module_'+module]){
                        var arr = SERVICE_CONFIG['module_'+module][type];
                        angular.forEach(arr, function(item, key){
                            if(item && item.name == value){
                                scope.stateName = item.value;
                            }
                        });
                    }

                }
            }
        }
    })
    .directive('sfBreadcrumb', function() {
        return {
            restrict: 'AE',
            scope:{
                arr:'='
            },
            replace:true,
            template:'<div class="breadcrumbs">' +
                '<span class="path">{{menuName}} > </span>' +
            '<span ng-repeat="item in arr track by $index"><a class="path text-info" ui-sref="{{item.path}}">{{item.name}}</a><span ng-if="$index<arr.length-1"> > </span></span>' +
            '</div>',
            link: function(scope, elem, attrs){
                var location = '';
                scope.$watch('arr', function(newV, oldV){
                    if(newV && newV.length > 0){
                        location = scope.arr[0].path;
                    }
                    if(location.indexOf('monitor')>-1){
                        scope.menuName = '资源监控';
                    } else if(location.indexOf('resources')>-1){
                        scope.menuName = '资源管理';
                    } else if(location.indexOf('configurations')>-1){
                        scope.menuName = '配置管理';
                    } else if(location.indexOf('alarm')>-1){
                        scope.menuName = '告警事件';
                    } else if(location.indexOf('logs')>-1){
                        scope.menuName = '日志管理';
                    }
                });
            }
        }
    })
    .directive('checkIpFormat', function(){
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, c){
                scope.$watch(attrs.ngModel, function(n){
                    if(!n)  return;
                    c.$setValidity('ipFormat', Utils.validIp(n));
                });
            }
        }
    })
    .directive('checkSuffix', function(){
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, c){
                scope.$watch(attrs.ngModel, function(n){
                    if(!n)  return;

                    var reg = /^\d{1,}(T|G|M|K|t|g|m|k)$/;
                    var isError = false;
                    if(reg.exec(n)!=null) {
                        isError = true;
                    }
                    c.$setValidity('suffix', isError);
                });
            }
        }
    })
    .directive('checkNameUnique', function(commonService){
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, c){

                var module = attrs['module'];

                scope.$watch(attrs.ngModel, function(n){
                    if(!n)  return;
                    if(module == 'vm'){
                        var params = {'conditions':[{'name':'name','op':'=','value':n}]};
                        commonService.vm_query(params).then(function(response){
                            if((response.status || response.errorCode==0) && response.result.length > 0){
                                c.$setValidity('nameUnique', false);
                            } else {
                                c.$setValidity('nameUnique', true);
                            }
                        });
                    } else if(module == 'volume'){
                        var params = {'conditions':[{'name':'name','op':'=','value':n}]};
                        commonService.volume_query(params).then(function(response){
                            if((response.status || response.errorCode==0) && response.result.length > 0){
                                c.$setValidity('nameUnique', false);
                            } else {
                                c.$setValidity('nameUnique', true);
                            }
                        });
                    }
                });
            }
        }
    })
    .directive('checkDomain', function(){
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, c){
                scope.$watch(attrs.ngModel, function(n){
                    if(!n)  return;
                    c.$setValidity('domain', Utils.validDomain(n));
                });
            }
        }
    })
    .directive('logEvent', function($compile, commonService) {
        return {
            restrict: 'AE',
            scope:{
                module:'=',
                value:'='
            },
            template:'<span>{{eventName}}</span>',
            link: function(scope, elem, attrs){

                scope.eventName = scope.value;

                scope.$watch('value', function(n){
                    if(n){
                        transferEvent(scope.module, n);
                    }
                    $compile(elem.contents())(scope);
                });

                function transferEvent(module, value){
                    var params = {"module":module,"type":module+'_log',"name":value};
                    commonService.dictionary_query(params).then(function(response){
                        if((response.status || response.errorCode==0) && response.result.length > 0){
                            scope.eventName = response.result[0].value;
                        }
                    });
                }
            }
        }
    })
    .filter('operateFilter', function(){
        return function(input){
            if(!input || input=='') return '';
            if(input.toLowerCase()=='success'){
                return '成功';
            } else if(input.toLowerCase()=='fail'){
                return '失败';
            }
        }
    })
    .filter('resourceTypeFilter', function(SERVICE_CONFIG){
        return function(input){
            if(!input || input=='') return '';
            if(input.toLowerCase()=='vm'){
                return SERVICE_CONFIG.module_vm.name;
            } else if(input.toLowerCase()=='vol'){
                return SERVICE_CONFIG.module_vol.name;
            }
        }
    })
    .filter('booleanFilter', function(){
        return function(input){
            if(input || input=='true'){
                return '是';
            } else if(!input || input=='false'){
                return '否';
            } else {
                return input;
            }
        }
    });
