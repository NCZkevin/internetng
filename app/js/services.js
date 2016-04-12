angular.module('myApp.services',[])
.factory('tmsUtil',  function(){
	processHttpError = function (res) {
		console.log(res);
	}
	return {
		processHttpError : processHttpError
	}
	
})