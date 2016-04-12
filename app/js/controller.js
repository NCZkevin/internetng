angular.module('myApp.controller',[])
  .controller('RzController', function($scope,$http){
	$http.get('../json/data.json').success(function(data,status,headers,config){
		$scope.rzlist = data;
	}).error(function(data,status,headers,config){

	}) });



