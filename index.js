var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./controllers'));

app.listen(process.env.PORT || 3000, function() {
  console.log('Ready to rock!');
});
