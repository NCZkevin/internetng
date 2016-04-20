angular.module('myApp.services',[])
.factory('newZhoubao',function ($resource,ENV,$rootScope) {
	var ApiUrl = ENV.api;
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
.factory('NewTopics',function($resource,ENV,$rootScope,$ionicLoading){
	var ApiUrl = ENV.api;
	ApiUrl = ApiUrl + "/NewTopics";
	result = [];
	return {
		NewTopic : function(id,title,content,token){
			return $resource(ApiUrl,{}).save({
				id: id,
				title: title,
				content:content,
				sign:token
			}, function(response) {
				result = response ;
				$rootScope.$broadcast('PostTopic_Ok');//已执行
			},function(){
				$ionicLoading.show({
					noBackdrop:true,
					template:"网络超时，请检查数据连接",
					duration:2000
				});
			});
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
