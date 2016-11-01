angular.module('myApp',[
	'ngRoute',
	'ngResource',
	'ui.router',
	'ngStorage',
	'myApp.config',
	'myApp.services',
	'myApp.controller'
	]).

	config(function($stateProvider,$locationProvider,$urlRouterProvider,$httpProvider) {
		// $locationProvider.html5Mode({
		//   enabled: true,
		//   requireBase: false
		// });
		$stateProvider
			.state('home',{
				url: '/',
				templateUrl : '../templates/home.html',
				controller : 'indexCtrl'
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
			.state('ap',{
				url:'/ap',
				templateUrl : '../templates/ap/ap.html',
				controller : 'ApCtrl'
			})
			.state('aptest',{
				url:'/apline',
				templateUrl : '../templates/ap/apline.html',
				controller : 'HisapCtrl'
			})
			.state('login',{
				url: '/login',
				templateUrl : '../templates/login/index.html',
				controller: 'HomeCtrl'
			})
			.state('wxrz',{
				url: '/wxrz',
				templateUrl : '../templates/onlytest/wxrz.html'
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
				templateUrl : '../templates/worklog/guzhang.html',
				controller : 'guzhangCtrl'
			})
			.state('sxzb',{
				url: '/sxzb',
				templateUrl : '../templates/student/sxzb.html',
				controller : 'zbCtrl'
			})
			.state('sxzbdetail',{
				url: '/sxzb/:id',
				templateUrl : '../templates/student/zbdetail.html',
				controller: 'zbdeCtrl'
			})
			.state('test',{
				url: '/test',
				templateUrl: '../templates/onlytest/test.html',
				controller: 'testCtrl'
			})
			.state('room',{
				url: '/room',
				templateUrl: '../templates/room/room.html',
				controller: 'roomCtrl'
			})
			.state('addsxzb',{
				url: '/addsxzb',
				templateUrl : '../templates/student/addsxzb.html'
			});
			$urlRouterProvider.otherwise('/');

	}).
	config(function($httpProvider){
		// var interceptor = function($q, $rootScope, Auth) {
		// 	return {
		// 		'request' : function (req) {
		// 			req.params = req.params || {};
		// 			if (Session.isAuthorized() && !req.params.token) {
		// 				req.params.token = Auth.getToken();
		// 			}
		// 			return req;
		// 		}
		// 	}
		// }

		//拦截请求，在头部加上token
		// $httpProvider.interceptors.push('AuthInterceptor');
		// $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
		// $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	 $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	//  if($localStorage.token){
	// 		$http.defaults.headers.common.Authorization= 'Bearer ' + $localStorage.token;
	// }else{
	// 		window.location.href = "/login";
	// };

	//拦截请求，在头部加上token
	 $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
				return {
						'request': function (config) {
								config.headers = config.headers || {};
								if ($localStorage.token) {
										config.headers.Authorization = 'Bearer ' + $localStorage.token;
										console.log(config.headers);
								}
								return config;
						},
						'responseError': function(response) {
								if(response.status === 401 || response.status === 403) {
										$location.path('/login');
								}
								return $q.reject(response);
						}
				};
		}]);

	}).
	controller('testcontroller', function($scope){
		$scope.message = "hello world";
	})
	// .factory('OAuth',function($rootScope,$httpProvider))

	;
	// .
	// factory('oauthHttpInterceptor', [ 'OAuth', function(OAuth, $q) {
  //   return {
	// 		 request: function(config) {
	//
	// 		  if (config.headers.Authorization === 'Bearer') {
	// 		  config.headers.Authorization = 'Bearer ' + btoa(OAuth.accessToken);
	// 		  }
	// 		  return config;
	// 		 }
	// 		 };
	// }]).
	// config(function($httpProvider) {
	// 		 $httpProvider.interceptors.push('oauthHttpInterceptor');
	// });
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
