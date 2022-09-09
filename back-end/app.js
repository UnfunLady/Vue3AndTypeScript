var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const { authToken } = require('./utils/index.js')
const verify = (req, res, next) => {
  //  忽略图片请求 req.path.substring(1, req.path.lastIndexOf('/')) == 'images'
  if (req.path == '/api/login' || req.path.substring(1, req.path.lastIndexOf('/')) == 'images') {
    next();
  } else {
    if (!req.headers.token) {
      res.send({ code: 203, msg: '缺少token' })
    } else {
      if (authToken(req.headers.token)) {
        next()
      } else {
        res.send({ code: 203, msg: '用户身份信息过期,请重新登录' })
      }
    }
  }
}
// app.use(verify)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;