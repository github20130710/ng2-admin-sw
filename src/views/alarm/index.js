/**
 * Created by sophia.wang on 17/9/1.
 */
'use strict';

/**
 * 告警管理服务模块
 * 包含: 常量 服务请求
 */
var alarm = angular.module('alarm', ['ui.router']);

alarm.service('alarmService', function($resource, $q, $http){

    var self = this;

    self.transfer = function(cmd, paramObj){
        var res_cmd = $resource(cmd, paramObj, {
            get: {method:'GET'},
            delete: {method:'DELETE'},
            post: {method:'POST',headers :{'Content-Type' : 'application/json;charset=UTF-8'}}
        });
    };

    self.getRules = function(){
        $http.get('views/alarm/data.json').success(function (data) {
            if(data.errorCode=='0' || data.status)
                return data.result;
            else
                return [];
        }).error(function(error){
            return [];
        });
        //var res_cmd = $resource('', {}, {
        //    get: {method:'GET'}
        //});
        //var task = $q.defer();
        //res_cmd.get({},function(response) {
        //    task.resolve(response);
        //},function(error){
        //    console.log(error);
        //});
        //return task.promise;
    };

    return self;
});

alarm.controller('alarmCtrl', ['$scope', 'alarmService', function alarmCtrl($scope, alarmService){
    $scope.dataAttr = [];

    $scope.colArr = [
        {
            field: 'ruleName',
            displayName: '名称',
            cellTemplate: '<div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;cursor:pointer;" title="{{row.entity.ruleName}}" class="text-info" ui-sref="app.alarm.alarmrulemanagement_detail({uuid: row.entity.uuid})">{{row.entity.ruleName}}</div>'
        },
        {
            field: 'objType',
            displayName: '设备类型'
        },
        {
            field: 'metric',
            displayName: '指标名称'
        },
        {
            field: 'grade',
            displayName: '告警级别'
        },
        {
            field: 'ruleitem',
            displayName: '告警条件',

        },
        {
            field: 'scope',
            displayName: '告警范围'
        },
        {
            field: 'notice_type',
            displayName: '通知方式',
            cellTemplate:'<div  ng-show="row.entity.isNotice == \'n\'"> 无</div> <div title="{{row.entity.noticeEmail}}" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" ng-show="row.entity.isNotice == \'y\' && row.entity.noticeWay == \'email\' ">{{row.entity.noticeEmail}}</div> <div title="{{row.entity.noticePhone}}" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" ng-show="row.entity.isNotice == \'y\' && row.entity.noticeWay == \'phone\' ">{{row.entity.noticePhone}}</div>'
        }
    ];

    $scope.params = {grid: {}, fun: {}};

    // callback function
    $scope.callFn = function(item){
        $scope.selectedItem = item;
    };

    $scope.loadData = function() {
        //$scope.dataArr = alarmService.getRules();
        $scope.dataAttr = [
            {
                "uuid": "160911753b874236b8f15828eab9b895",
                "createTime": 1498111856000,
                "updateTime": 1502245490000,
                "ruleName": "磁盘读",
                "metric": "vm_disk_write",
                "objType": "zkvm",
                "operate": "<",
                "threshold": -9,
                "unit": "Kb/s",
                "grade": "fault",
                "period": 3,
                "scope": "all",
                "objUuid": "",
                "isNotice": "y",
                "noticeWay": "email",
                "noticeEmail": "wang_chun_fa@163.com;wangcf@chinaskycloud.com",
                "noticePhone": ""
            },
            {
                "uuid": "31576b25f92b42948228a7e51c5dfe8b",
                "createTime": 1499072186000,
                "updateTime": 1502163514000,
                "ruleName": "alarmrule",
                "metric": "vm_disk_write",
                "objType": "zkvm",
                "operate": ">",
                "threshold": 1,
                "unit": "P",
                "grade": "warning",
                "period": 1,
                "scope": "all",
                "objUuid": "",
                "isNotice": "y",
                "noticeWay": "email",
                "noticeEmail": "yanghuan@asiainfo.com",
                "noticePhone": ""
            },
            {
                "uuid": "39b720e1bdce4fa89df13b87e669ffc8",
                "createTime": 1498111888000,
                "updateTime": 1498117114000,
                "ruleName": "内存",
                "metric": "vm_mem_usage",
                "objType": "zkvm",
                "operate": ">",
                "threshold": -9,
                "unit": "%",
                "grade": "warning",
                "period": 3,
                "scope": "all",
                "objUuid": "",
                "isNotice": "y",
                "noticeWay": "email",
                "noticeEmail": "wang_chun_fa@163.com;wangcf@chinaskycloud.com",
                "noticePhone": ""
            },
            {
                "uuid": "562a273d38754cb89c7070c0b1492f63",
                "createTime": 1498619670000,
                "updateTime": 1498635531000,
                "ruleName": "资源池tt",
                "metric": "vm_cpu_usage",
                "objType": "zcapacity",
                "operate": "<",
                "threshold": 3,
                "unit": "%",
                "grade": "serious",
                "period": 5,
                "scope": "all",
                "objUuid": "",
                "isNotice": "y",
                "noticeWay": "email",
                "noticeEmail": "wang_chun_fa@163.com;wangcf@chinaskycloud.com",
                "noticePhone": ""
            },
            {
                "uuid": "7bc213d13651487d97242b3ce9b28bf7",
                "createTime": 1502245579000,
                "updateTime": 1502245606000,
                "ruleName": "pd76",
                "metric": "vm_mem_usage",
                "objType": "zkvm",
                "operate": ">",
                "threshold": 1,
                "unit": "%",
                "grade": "attention",
                "period": 3,
                "scope": "all",
                "objUuid": "",
                "isNotice": "n",
                "noticeWay": "",
                "noticeEmail": "",
                "noticePhone": ""
            },
            {
                "uuid": "913db7745b2a403bbec32363712de174",
                "createTime": 1502186713000,
                "updateTime": 1502186713000,
                "ruleName": "alarmrulemanagement_c17e",
                "metric": "vm_cpu_usage",
                "objType": "zkvm",
                "operate": ">",
                "threshold": 90,
                "unit": "%",
                "grade": "serious",
                "period": 3,
                "scope": "one",
                "objUuid": "01dd3c8ae4eb4343b4895aea6d112cda",
                "isNotice": "n",
                "noticeWay": "",
                "noticeEmail": "",
                "noticePhone": ""
            },
            {
                "uuid": "a83bcd69c9a34f00908d071c6e4e015a",
                "createTime": 1503458181000,
                "updateTime": 1503458181000,
                "ruleName": "alarmrulemanagement_4as0",
                "metric": "vm_cpu_usage",
                "objType": "zkvm",
                "operate": ">",
                "threshold": 10,
                "unit": "%",
                "grade": "serious",
                "period": 1,
                "scope": "all",
                "objUuid": "",
                "isNotice": "n",
                "noticeWay": "",
                "noticeEmail": "",
                "noticePhone": ""
            }
        ];
    };

    $scope.loadData();
}]);

alarm.controller('alarmTodoCtrl', function alarmDetailCtrl($scope, $stateParams){
    $scope.name = $stateParams.name;
});

alarm.controller('alarmFinCtrl', function alarmDetailCtrl($scope, $stateParams){
    $scope.name = $stateParams.name;
});

alarm.config(['$stateProvider', function ($stateProvider){
    $stateProvider
        .state('app.alarm', {
            url: '/alarm',
            templateUrl: 'views/alarm/index.html',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['sf.ui.grid']);
                    }]
            }
        })
        .state('app.alarm.todo', {
            url: '/alarm_todo',
            templateUrl: 'views/alarm/detail.html'
        });
}]);

angular.bootstrap(document.getElementById("alarmWrapper"),['alarm']);