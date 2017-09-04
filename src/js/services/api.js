/**
 * Created by sophia.wang on 17/6/22.
 */
angular.module('app')
.factory('apiZstack', function($resource, $q, fakeMapping, $cookieStore, toaster, $timeout, SERVICE_CONFIG){
    var self = this;

    // before the ajax send
    self.transfer = function(cmd, paramObj){
        if(!paramObj) {
            paramObj = {};
        }
        var userUuid = $cookieStore.get('userInfo') ? $cookieStore.get('userInfo').uuid : '';
        if(!paramObj.session && userUuid) {
            paramObj.session = {"uuid": userUuid};
        }
        if((cmd.indexOf('query') > -1 || cmd.indexOf('Query') > -1) && !paramObj.conditions) {
            paramObj.conditions = [];
        }
        var pool = $cookieStore.get('currentPool');
        paramObj.poolId = pool ? pool.uuid : '';
        var res_cmd = $resource(cmd, paramObj, {
            get: {method:'GET'},
            delete: {method:'DELETE'},
            post: {method:'POST',headers :{'Content-Type' : 'application/json;charset=UTF-8'}}
        });
        return res_cmd;
    };

    self.send = function(cmd, params){
        var res_cmd = self.transfer(cmd, params);
        var task = $q.defer();
        res_cmd.post(params,function(response) {
            if(response.status || response.errorCode==0){
                task.resolve(response);
            } else {
                if(response.errorCode=='SKYID.1001'){
                    toaster.pop('error', '', '会话已过期, 请重新登录!');
                    $timeout(function(){
                        var logoutUrl = SERVICE_CONFIG.casServiceURL + "/logout";
                        window.location = logoutUrl;
                    }, 1000);
                } else {
                    toaster.pop('error', '', response.message);
                }
            }
        }, function(error){
            console.log(error);
        });
        return task.promise;
    };

    self.get = function(cmd, params){
        var res_cmd = $resource(cmd + "?" + params, {}, {
            get: {method:'GET'}
        });
        var task = $q.defer();
        res_cmd.get({},function(response) {
            task.resolve(response);
        },function(error){
            console.log(error);
        });
        return task.promise;
    };

    return self;
});