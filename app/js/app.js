angular.module('myApp',['ngRoute','myApp.controller','myApp.services']).
	config(function($routeProvider,$locationProvider) {
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
		$routeProvider
			.when('/',{
				templateUrl : '../templates/home.html',
				controller  : ''
			})
			.when('/addrz',{
				templateUrl : '../templates/addrz.html',
				controller  : ''
			})
			.when('/wxrz',{
				templateUrl : '../templates/wxrz.html',
				controller  : ''
			})
			.when('/gzrz',{
				templateUrl : '../templates/gzrz.html',
				controller  : ''
			})
			.when('/qjia',{
				templateUrl : '../templates/qjia.html',
				controller  : ''
			})
			.when('/addqjia',{
				templateUrl : '../templates/addqjia.html',
				controller  : ''
			})


			.otherwise({
				redirectTo:'/'
			})
	}).
	controller('testcontroller', function($scope){
		$scope.message = "hello world";
	});