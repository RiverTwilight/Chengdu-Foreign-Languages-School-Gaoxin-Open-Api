var express = require('express');
var indexRouter = require('./route/index')
var port = process.env.PORT || 3000;
var app = express(),
path = require('path'),
publicDir = path.join(__dirname,'public');

app.use(express.static(publicDir))

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Content-Type', 'text/css;charset=utf-8');
    next();
  });

app.use('/', indexRouter)

app.listen(port, () => console.log(`Express demo listening on port ${port}!`));
module.exports = app;
