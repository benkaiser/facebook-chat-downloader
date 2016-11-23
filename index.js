var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(session({
  cookie: { secure: process.env.ENV != 'development' },
  resave: false,
  saveUninitialized: true,
  secret: 'facebook-chat-downloader-secret',
  store: new RedisStore({
    host: 'redis'
  })
}));
app.use(require('./controllers'));

app.listen(process.env.PORT || 3000, function() {
  console.log('Ready to rock!');
});
