var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use('/',express.static('./app'));
app.all('*', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    // res.header("Content-Type","application/x-www-form-urlencoded");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

app.get('/login/auth', function(req, res) {

});

app.listen(8000);
