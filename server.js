var express = require('express');
var cors = require('cors');
var superagent = require('superagent');
var app = express();

app.use(cors());
app.use('/',express.static('./app'));
app.all('*', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,withCredentials");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Credentials","true");
    res.header("Content-Type","application/x-www-form-urlencoded");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

app.get('/login/auth', function(req, res) {

});
app.get('/login/', function(req, res) {
  var cburl = "http://localhost:8080/oauth/token?client_id=test&client_secret=test&grant_type=authorization_code&code=" + req.query.code + "&redirect_uri=http://localhost:8000/login&state=09876999"
  superagent.post(cburl)
        .set('Content-Type','application/x-www-form-urlencoded;charset=utf-8')
        .end(function (err,ret) {
          if (err) {
            console.log(err);
          }
          console.log(ret);
          if (ret.access_token) {
            console.log(ret.access_token);
            res.redirect('/');
          }
          else {
            console.log(err);
          }
        });
});

app.listen(8000);
