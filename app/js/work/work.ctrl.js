(function () {
  'use strict';

  angular.module('myApp')
    .controller('WorkCtrl', function ($rootScope,$scope,$log,$state,$location,lodash,toaster,Auth,Blog,Comment,$stateParams) {

      $scope.aid = $stateParams.aid;
      if(!$scope.aid){
        $state.go('home');
      }
      $scope.isAdmin = Auth.isAdmin;
      $scope.isLoggedIn = Auth.isLoggedIn;


      Work.getFrontArticle({id:$scope.aid}).then(function (result) {
        $scope.article = result.data;
      }).then(function () {
        var options = {
          id:$scope.aid,
          sortName:'publish_time',
          tagId:''
        };
        if(localStorage.options){
          options = lodash.merge(options,JSON.parse(localStorage.options));
        }

        Work.getPrenext(options).then(function (result) {
          $scope.next = result.data.next || {};
          $scope.prev = result.data.prev || {};
        });
      }).catch(function () {
        $state.go('home'); 
      });

      Comment.getFrontCommentList({id:$scope.aid}).then(function (result) {
        $scope.commentList = result.data;
      }).catch(function (err) {
        $log.debug(err);
        $scope.commentList = [];
      });

      Auth.isLoggedInAsync(function(loggedIn) {
        if (loggedIn) {
          $scope.isLike = Auth.isLike($scope.aid);
        }else{
          $scope.isLike = false;
        }
      });

      $scope.newComment = {
        content:''
      };

      $scope.submitNewComment = function (aid) {
        $scope.newComment.aid = aid;
        Comment.addNewComment($scope.newComment).then(function (result) {
          $scope.commentList.push(result.data);
          $scope.newComment.content = '';
        }).catch(function (err) {
          $log.debug(err);
          toaster.pop('error','','评论添加错误,请重试.');
        });
      };

      $scope.goToComment = function (id) {

        Auth.isLoggedInAsync(function(loggedIn) {
          if (loggedIn) {
            $('#' +id).focus();
          }else{
            $rootScope.opneSnsModal();
          }
        });
      };

      $scope.toggleLike = function (aid) {

        Auth.isLoggedInAsync(function(loggedIn) {
          if (loggedIn) {
            Work.toggleLike({id:aid}).then(function (result) {
              $scope.article.like_count = result.count;
              $scope.isLike = result.isLike;
            });
          }else{
            $rootScope.opneSnsModal();
          }
        });
      };

    });
})();
