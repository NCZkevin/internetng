var myConfig = angular.module('myApp.config', []);
var kurl = "http://222.204.3.177/api";
var local = "localhost:8080"
myConfig.constant("ENV",{
  "api"   : "localhost:3000",
  "login" : "localhost:3000/login",
  "worklog" : "localhost:3000/api/worklog",
  "sxzb"  : "localhost:3000/api/sxzb",
  "leave": "localhost:3000/api/leave",
  "guzhang" : "localhost:3000/api/guzhang",
  "test" : kurl + '/test1',
  "user" : kurl + '/sys/user',
  "realap" : kurl + '/operation/realTimeApNum',
  "historyap" : kurl + '/operation/historyApNum',
  "worklist" : kurl + '/internship/weekly/list',
  "zb" : kurl + '/internship/weekly'
})
