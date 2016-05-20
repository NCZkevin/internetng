angular.module('myApp.services',['ngResource'])
.factory('apData',function ($resource,ENV,$rootScope,$http) {
	var ApiUrl = ENV.test;
	apdata = {};
	return{
		getApdata:function(){
			$resource(ApiUrl).get({},function(resp){
				apdata = resp.result;
				$rootScope.$broadcast('ap_ok');
				return apdata;
			});
		},
		getApDetail: function () {
			$http.post(ENV.test,null,{headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}})
			.success(function(data){
				$rootScope.$broadcast('ap_ok');
				apdata = data;
				return apdata;
			});
		}
	}
})
.factory('newZhoubao',function ($resource,ENV,$rootScope) {
	var ApiUrl = ENV.test;
	zhoubao = {};
	return{
		getZhoubao:function(){
			$resource(ApiUrl).post({},function(resp){
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
.factory('AuthInterceptor', function ($rootScope, $q, $cookies, $location, $injector ,$localStorage) {
	var Auth;
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($localStorage.token) {
				config.headers.Authorization = 'Bearer ' + $localStorage.token;
			}
			return config;
		},
		response: function (response) {
			return response;
		},
		responseError:function(rejection){
			if (rejection.status === 401) {
				Auth = $injector.get('Auth');
				Auth.logout();
				$location.path('/login');
				return $q.reject(rejection);
			}else {
				return $q.reject(rejection);
			}
		}
	};
});
// .factory('Auth', ['$rootScope', '$scope', '$location', '$localStorage','$http', function($rootScope, $scope, $location, $localStorage, $http) {
//         var baseUrl = "http://localhost:8080/oauth/token?client_id=test&client_secret=test&grant_type=password&scope=read write&username="
//         $scope.signin = function() {
//             var formData = {
//                 email: $scope.username,
//                 password: $scope.password
//             };
//           $http({
//             method: 'POST',
//             url : baseUrl + $scope.username + '&password=' + $scope.password,
//             headers : { 'Content-Type': 'application/x-www-form-urlencoded',
//                       'Accept': 'application/x-www-form-urlencoded'}
//           }).success(function(data) {
//               console.log(data);
//             });
//
//
//         $scope.token = $localStorage.token;
//     }]);

// .factory('tmsUtil',  function(){
// 	processHttpError = function (res) {
// 		console.log(res);
// 	}
// 	return {
// 		processHttpError : processHttpError
// 	}
//
// })
