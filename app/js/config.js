var myConfig = angular.module('myApp.config', []);
myConfig.constant("ENV",{
  "api"   : "localhost:3000",
  "login" : "localhost:3000/login",
  "worklog" : "localhost:3000/api/worklog",
  "sxzb"  : "localhost:3000/api/sxzb"
})
