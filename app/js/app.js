angular.module('myApp',[
	'ngRoute',
	'ngResource',
	'ui.router',

	'myApp.controller',
	'myApp.services']).

	config(function($stateProvider,$locationProvider,$urlRouterProvider,$httpProvider) {
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});

		// var interceptor = function($q, $rootScope, Auth) {
		// 	return {
		// 	'response': function(resp) {
		// 	if (resp.config.url == '/api/login') {
		// 	// 假设API服务器返回的数据格式如下:
		// 	// { token: "AUTH_TOKEN" }
		// 	Auth.setToken(resp.data.token);
		// 	}
		// 	return resp;
		// 	},
		// 'responseError': function(rejection) {
		// 	// 错误处理
		// switch(rejection.status) {
		// 	case 401:
		// 	if (rejection.config.url!=='api/login')
		// 		// 如果当前不是在登录页面
		// 		$rootScope.$broadcast('auth:loginRequired');
		// 		break;
		// 		case 403:
		// 		$rootScope.$broadcast('auth:forbidden');
		// 		break;
		// 		case 404:
		// 		$rootScope.$broadcast('page:notFound');
		// 		break;
		// 		case 500:
		// 		$rootScope.$broadcast('server:error');
		// 		break;
		// 		}
		// 		return $q.reject(rejection);
		// 		}
		// 		};





		$stateProvider
			.state('home',{
				url: '/',
				templateUrl : '../templates/home.html'
			})
			.state('addrz',{
				url: '/addrz',
				templateUrl : '../templates/addrz.html',
				controller: function($http){
					$http(
					{
						method: 'GET',
						url: 'http://222.204.3.127'
					})
				}
			})
			.state('login',{
				url: '/login',
				templateUrl : '../templates/login/index.html'
			})
			.state('wxrz',{
				url: '/wxrz',
				templateUrl : '../templates/wxrz.html'
			})
			.state('gzrz',{
				url: '/gzrz',
				templateUrl : '../templates/gzrz.html'
			})
			.state('qjia',{
				url: '/qjia',
				templateUrl : '../templates/leave/qjia.html'
			})
			.state('addqjia',{
				url: '/addqjia',
				templateUrl : '../templates/leave/addqjia.html'
			})
			.state('dashi',{
				url: '/dashi',
				templateUrl : '../templates/worklog/dashi.html'
			})
			.state('guzhang',{
				url: '/guzhang',
				templateUrl : '../templates/worklog/guzhang.html'
			})
			.state('sxzb',{
				url: '/sxzb',
				templateUrl : '../templates/student/sxzb.html'
			})
			.state('addsxzb',{
				url: '/addsxzb',
				templateUrl : '../templates/student/addsxzb.html'
			});
			$urlRouterProvider.otherwise('/');

	}).
	controller('testcontroller', function($scope){
		$scope.message = "hello world";
	});
	// .factory('Auth', function($cookieStore,ACCESS_LEVELS) {
	// 	var _user = $cookieStore.get('user');
	// 	var setUser = function(user) {
	// 		if (!user.role || user.role < 0) {
	// 			user.role = ACCESS_LEVELS.pub;
	// 		}
	// 			_user = user;
	// 			$cookieStore.put('user', _user);
	// 		};
	// 			return {
	// 		isAuthorized: function(lvl) {
	// 			return _user.role >= lvl;
	// 		},
	// 			setUser: setUser,
	// 			isLoggedIn: function() {
	// 			return _user ? true : false;
	// 		},
	// 		getUser: function() {
	// 			return _user;
	// 		},
	// 		getId: function() {
	// 			return _user ? _user._id : null;
	// 		},
	// 		getToken: function() {
	// 			return _user ? _user.token : '';
	// 		},
	// 		logout: function() {
	// 			$cookieStore.remove('user');
	// 			_user = null; }
	// 		}
	// 		};
	// 		})
	// .constant('ACCESS_LEVELS', {
	// 	pub: 1,
	// 	user: 2
	// });










