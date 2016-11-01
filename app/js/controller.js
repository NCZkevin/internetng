angular.module('myApp.controller',['chart.js'])
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }])
  .controller("LineCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  // $timeout(function () {
  //   $scope.data = [
  //     [28, 48, 40, 19, 86, 27, 90],
  //     [65, 59, 80, 81, 56, 55, 40]
  //   ];
  // }, 3000);
}])
.controller('HisapCtrl',function($scope,ENV,HisapData,$http){

  HisapData.getHisap().then(function(result){
    $scope.testap = result.list;

    function transform(obj){
      var arr = [];
      for(var item in obj){
          arr.push(obj[item].apSum);
      }
      return arr;
    }
    function transform1(obj){
      var arr = [];
      for(var item in obj){
          arr.push(obj[item].sumDate);
      }
      return arr;
    }
    var aparr = transform(result.list);

    var namearr = [];
    var namearr = transform1(result.list);
    $scope.labels = namearr;
    $scope.series = ['A'];

    $scope.data = [
      aparr
    ];
  })
 }
)
 .controller('ApCtrl',function($scope,ENV,apData,$http){
  $scope.name='ApCtrl';
  // apData.getApdata();
  // $scope.testap = apData.getApDetail();
  $http.post(ENV.realap,{})
  .success(function(data){
    $scope.testap= data;
    $scope.aplist = data.list;


    var dataArray=eval(data.realtimeCounter);

    function transform(obj){
      var arr = [];
      for(var item in obj){
          arr.push(obj[item]);
      }
      return arr;
    }
    var aparr = transform(data);
    console.log(aparr);
    var namearr = [];
    for(var o in data){//遍历 obj
      namearr.push(o);//存入数组
    }
    console.log(namearr);
    $scope.labels = namearr;
    $scope.series = ['A'];

    $scope.data = [
      aparr
    ];
  });
  }
)


.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage','$http', function($rootScope, $scope, $location, $localStorage, $http) {

        var baseUrl = "http://222.204.3.177/oauth/token?client_id=test&client_secret=test&grant_type=password&scope=read write&username=";
        $scope.signin = function() {
            $http.post(baseUrl + $scope.username + '&password=' + $scope.password,{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .success(function(data){
              token = data.access_token;
              console.log(token);
              $localStorage.token = data.access_token;
              window.location = "/";
            })

          // $http({
          //   method: 'POST',
          //   url : baseUrl + $scope.username + '&password=' + $scope.password,
          //   headers: {
          //       'Content-Type': 'application/x-www-form-urlencoded'}
          // }).success(function(data) {
          //     console.log(data);
          //   });

          //  $http.post(baseUrl + $scope.username + '&password=' + $scope.password,{ 'Content-Type': 'application/x-www-form-urlencoded'})
          //  .success(function(data){
          //    console.log(data);
          //  });
            // Main.signin(formData, function(res) {
            //     if (res.type == false) {
            //         alert(res.data)
            //     } else {
            //         $localStorage.token = res.data.token;
            //         window.location = "/";
            //     }
            // }, function() {
            //     $rootScope.error = 'Failed to signin';
            // })
        };

        $scope.token = $localStorage.token;
    }])
    .controller('testCtrl', ['$rootScope', '$scope', '$location', '$localStorage','$http','ENV', function($rootScope, $scope, $location, $localStorage, $http,ENV) {
            // var testurl = "http://localhost:8080/api/test";
            $scope.testjson = function() {

                $http.post(ENV.test,null,{headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  'Authorization': 'Bearer ' + $localStorage.token
                  }})
                .success(function(data){
                  console.log(data);
                  $scope.data = data;
                })
              };
        }])
.controller('indexCtrl',function($scope,ENV,apData,$http){
         $scope.name='indexCtrl';
         // apData.getApdata();
        //  $scope.testap = apData.getApDetail();
        //  console.log($scope.testap);
        apData.getApDetail().then(function(result){
          $scope.testap = result;

          function transform(obj){
            var arr = [];
            for(var item in obj){
                arr.push(obj[item]);
            }
            return arr;
          }
          var aparr = transform(result);

          var namearr = [];
          for(var o in result){//遍历 obj
            namearr.push(o);//存入数组
          }

          $scope.labels = namearr;
          $scope.series = ['A'];

          $scope.data = [
            aparr
          ];
        })
         }
       )
.controller('userCtrl',function($scope,ENV,userService,$http){

           userService.getUserDetail().then(function(result){
             $scope.userinfo = result;
           })
})
.controller('zbCtrl',function($scope,ENV,zbService,$http){
          zbService.getZb().then(function(result){
          $scope.zbinfo = result;
          $scope.zblist = result.list;
          })
})
//机房管理控制
.controller('roomCtrl',function($scope,ENV,zbService,$http){
          zbService.getZb().then(function(result){
          $scope.zbinfo = result;
          $scope.zblist = result.list;
          })
})
.controller('zbdeCtrl',function($scope,ENV,zbdeService,zbService,$http){
  zbService.getZb().then(function(result){
  $scope.zbinfo = result;
  $scope.zblist = result.list;
  var zbde = zbdeService.get({zbid:result.list.id});
  console.log(zbde);
  })
})
// .controller('PersonalCtrl', function($scope,$rootScope,Storage,$state,UserLogin,$ionicActionSheet,$timeout) {
//   $rootScope.hide='tabs-item-hide';
//   $scope.$on('$destroy',function(){
//     $rootScope.hide = '';
//   });
//   var storageKey='user';
//   $scope.$on('$ionicView.beforeEnter', function() {
//     if(Storage.get(storageKey)&&Storage.get(storageKey).username!=''){
//       $scope.userInfo=Storage.get(storageKey);
//     }else{
//       $state.go('tab.login',{reload: true});
//     }
//   });
//   //退出登录
//   $scope.logout= function () {
//     var hideSheet = $ionicActionSheet.show({
//       destructiveText: '退出登录',
//       titleText: '确定退出当前登录账号么？',
//       cancelText: '取消',
//       cancel: function() {
//       },
//       destructiveButtonClicked: function() {
//         UserLogin.getLogout();
//         $state.go('tab.user');
//         return true;
//       }
//     });
//     // For example's sake, hide the sheet after two seconds
//     $timeout(function() {
//       // hideSheet();
//     }, 2000);
//   }
// })
//   .controller('HomeCtrl', function($scope) {
//     $scope.name='HomeCtrl';
//   })
//   .controller('ThreadCtrl', function($scope,ENV,TopicFactory,$ionicModal,NewTopics,Storage,$ionicLoading,$state) {
//     $scope.name='ThreadCtrl';
//     TopicFactory.getTopics();
//     $scope.showLoading = true;
//     $scope.$on('Topic_ok',function(){
//       $scope.topics = TopicFactory.getRealTopics();
//       $scope.showLoading = false;
//     });
//     $ionicModal.fromTemplateUrl('templates/thread/newTopic.html', {
//       scope: $scope
//     }).then(function(modal) {
//       $scope.newTopicModal = modal;
//     });
//     $scope.showNewTopicModal = function() {
//       // track view
//       $scope.newTopicModal.show();
//     };
//     // close new topic modal
//     $scope.closeNewTopicModal = function() {
//       $scope.newTopicModal.hide();
//     };
//     $scope.newTopicData = {
//       title:'',
//       content:''
//     };
//     $scope.saveNewTopic = function(){
//       var storageKey='user';
//       if(Storage.get(storageKey)&&Storage.get(storageKey).username!=''){
//         $scope.userInfo=Storage.get(storageKey);
//       }else{
//         $ionicLoading.show({
//           noBackdrop:true,
//           template:"请先登录",
//           duration:2000
//         });
//       };
//       NewTopics.NewTopic($scope.userInfo.data.id,$scope.newTopicData.title,$scope.newTopicData.content,$scope.userInfo.data.token);
//       //$on内方法已执行
//       $scope.$on('PostTopic_Ok', function () {
//        $state.go('tab.thread',{reload: true});
//       });
//     };
//   })
// //话题详情
// .controller('TopicDetailCtrl', function ($scope,TopicDetailFactory,$stateParams) {
//
// })
//   //注册
// .controller('RegisterCtrl', function (RegisterFactory,$rootScope,$ionicLoading,Storage,$state,$scope) {
//   $rootScope.hide='tabs-item-hide';
//   $scope.$on('$destroy',function(){
//     $rootScope.hide = '';
//   });
//   $scope.user={
//     email:'',
//     username:'',
//     password:'',
//     sex:''
//   };
//   $scope.register= function () {
//     if(document.getElementById("girl").checked==true){//得到选中的单选按钮如果要得到值 那么可以：
//       $scope.user.sex =document.getElementById("girl").value;//弹出选中单选按钮的值
//     }else {
//       $scope.user.sex = document.getElementById("boy").value;
//     }
//      RegisterFactory.register($scope.user.email,$scope.user.username,$scope.user.password,$scope.user.sex);
//   };
//   $scope.$on('Register_ok',function(){
//     var user = RegisterFactory.getMsg();
//     if (user.code==1){
//       $ionicLoading.show({
//         noBackdrop:true,
//         template:user.message,
//         duration:1500
//       });
//     }else {
//       $ionicLoading.show({
//         noBackdrop:true,
//         template:user.message,
//         duration:1500
//       });
//       Storage.set('user',user);
//       $state.go('tab.user',{reload: true});
//     }
//   });
// })
//   //登录
// .controller('LoginCtrl',function($scope,$rootScope,UserLogin,Storage,$state,$ionicLoading){
//   $rootScope.hide='tabs-item-hide';
//   $scope.$on('$destroy',function(){
//     $rootScope.hide = '';
//   });
//   $scope.user={
//     email:'',
//     password:''
//   };
//
//   $scope.signIn=function(){
//     UserLogin.login($scope.user.email,$scope.user.password);
//   };
//   $scope.$on('Login_ok',function(){
//     var user = UserLogin.getCurrentUser();
//     if (user.code==1){
//         $ionicLoading.show({
//           noBackdrop:true,
//           template:user.message,
//           duration:1500
//         });
//     }else {
//       Storage.set('user',user);
//       $state.go('tab.user',{reload: true});
//     }
//   });
// })
//   //ArticleCtrl
//
//   .controller('ArticleCtrl', function($scope,ArticleFactory,ENV,$timeout) {
//       $scope.name='ArticleCtrl';
//       $scope.ENV = ENV;
//       $scope.showLoading = true;
//       ArticleFactory.getFristTopics();
//       $scope.$on('PortalList.portalsUpdated', function() {
//           $scope.portalListData=ArticleFactory.getArticles();
//           $scope.$broadcast('scroll.infiniteScrollComplete');
//           $scope.showLoading = false;
//       });
//       $scope.doRefresh=function(){
//           ArticleFactory.getFristTopics();
//           $scope.$broadcast('scroll.refreshComplete');
//       }
//       $scope.changeTab=function(page,index){
//           var a=document.getElementById('sub_header_list').getElementsByTagName('a');
//           for (var i = 0; i < 8; i++) {
//               a[i].className = "button button-clear ";
//           }
//           a[index].className = "button button-clear sub_button_select";
//           //数据请求
//           ArticleFactory.setArticlesPage(page);
//       };
//       $scope.loadMore=function(){
//           ArticleFactory.getMoreTopics();
//       }
//       $scope.hasNextPage = function() {
//           //console.log(PortalsFactory.hasNextPage());
//           return ArticleFactory.hasNextPage();
//       };
//
//   })
// //详情页
//   .controller('DetailCtrl', function ($scope,$rootScope,$stateParams,DetailFactory) {
//       $scope.name='DetailCtrl';
//     $scope.showLoading = true;
//     $rootScope.hide='tabs-item-hide';
//     var id = $stateParams['id'];
//     DetailFactory.getDeteil(id);
//     $scope.$on('Details_ok',function(){
//       $scope.Article = DetailFactory.getAtricle();
//       $scope.showLoading = false;
//     });
//     $scope.$on('$destroy',function(){
//       $rootScope.hide = '';
//     });
//   })
//   .controller('UserCtrl', function($scope,Storage) {
//     var storageKey='user';
//     $scope.$on('$ionicView.beforeEnter', function() {
//       if(Storage.get(storageKey)&&Storage.get(storageKey).username!=''){
//         $scope.userInfo=Storage.get(storageKey);
//         console.log($scope.userInfo);
//       }else{
//         $scope.userInfo='';
//       }
//     });
//   });
// .controller('RzController', function($scope,$http){
// $http.get('../json/data.json').success(function(data,status,headers,config){
// 	$scope.rzlist = data;
// }).error(function(data,status,headers,config){
//
// }) })
