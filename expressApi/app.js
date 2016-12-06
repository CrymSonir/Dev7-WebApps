var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var unless = require('express-unless');
var passport = require('passport');
var Strategy = require('passport-json').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');

var Users = require('./models/Users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new Strategy(
  function(username, password, cb) {
    Users.find({username: username}, function(err, user) {
      if (err) { return cb(err); }
      user = user[0];
      if (!user ) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(function(id, cb) {
    Users.find({_id: id}, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

app.use(require('express-session')({ secret: 'SUPERPASS', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
  passport.authenticate('json'),
  function(req, res) {
    res.json({msg: 'LOGGED'});
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.json({msg: 'LOGGED OUT'});
  });

app.all('*', require('connect-ensure-login').ensureLoggedIn());

app.use('/', index);
app.use('/users', users);
app.use('/books', books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// load mongoose package
var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/restdatas')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

module.exports = app;
