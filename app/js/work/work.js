(function () {
	'use strict';

	angular.module('myApp.work',[])
	  .config(function ($stateProvider) {
	    $stateProvider
	      .state('work', {
	        url: '/work/:aid',
	        templateUrl: 'app/work/work.html',
	        controller: 'WorkCtrl'
	      });
	  });
})();
