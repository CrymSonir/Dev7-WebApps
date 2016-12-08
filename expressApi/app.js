var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var unless = require('express-unless');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');

var Users = require('./models/Users');

var app = express();
var apiRoutes = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// load mongoose package
var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/restdatas')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', function(req, res) {
  Users.findOne({username: req.body.username}, function(err, user) {
    if(!user) {
      return res.json({ success: false, message: 'Authentication failed.' });
    }
    if(user.password !== req.body.password) {
      return res.json({ success: false, message: 'Authentication failed.' });
    }
    var token = jwt.sign(user, 'SUPERPASS', {
      expiresIn: 60*60*2
    });
    res.json({success: true, token: token});
  });
});

apiRoutes.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('SUPERPASS'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided'
    });
  }
});

app.get('/logout',
  function(req, res){
    req.logout();
    res.json({msg: 'LOGGED OUT'});
  });

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

module.exports = app;
