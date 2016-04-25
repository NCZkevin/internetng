angular.module('myApp.services',[])
.factory('newZhoubao',function ($resource,ENV,$rootScope) {
	var ApiUrl = ENV.sxzb;
	zhoubao = {};
	return{
		getZhoubao:function(){
			$resource(ApiUrl).get({},function(resp){
				zhoubao = resp.result;
				$rootScope.$broadcast('zhou_ok');
			});
		},
		getRealZhoubao:function () {
			return zhoubao;
		}
	}
})
.factory('guzhanglist',function ($resource,ENV,$rootScope) {
	var ApiUrl = ENV.guzhang;
	guzhang = {};
	return{
		getguzhang:function(){
			$resource(ApiUrl).get({},function(resp){
				zhoubao = resp.result;
				$rootScope.$broadcast('gzlist_ok');
			});
		},
		getRealguzhang:function () {
			return zhoubao;
		}
	}
})
.factory('UserLogin', function ($resource,ENV,$rootScope) {
	var ApiUrl = ENV.api;
	ApiUrl = ApiUrl + "/UserLogin";
	user = {};
	return{
		login: function(email,password) {
			return $resource(ApiUrl,{}).save({
				email: email,
				password: password
			}, function(response) {
				//console.log(response);
				user=response.result;
				$rootScope.$broadcast('Login_ok');
			})
		},
		getCurrentUser: function(){
			return user;
		},
		getLogout:function(){
			remove('user');
		}
	}
})
//用户注册
.factory('RegisterFactory',function($rootScope,$resource,ENV){
	var ApiUrl = ENV.api;
	ApiUrl = ApiUrl + "/UserRegister";
	var user ={};
	return{
		register: function (email,username,password,sex) {
			$resource(ApiUrl,{}).save({
				email: email,
				username:username,
				password: password,
				sex:sex
			}, function (resp) {
				user = resp.result;
				$rootScope.$broadcast('Register_ok');
			},function(){
				show({
					noBackdrop:true,
					template:"网络超时，请检查数据连接",
					duration:2000
				});
			})
		},
		getMsg: function () {
			return user;
		}
	}
})

// .factory('tmsUtil',  function(){
// 	processHttpError = function (res) {
// 		console.log(res);
// 	}
// 	return {
// 		processHttpError : processHttpError
// 	}
//
// })
