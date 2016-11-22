var express = require('express');
var router = express.Router();

var Facebook = require('../services/facebook');

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  Facebook.login(email, password)
          .then((fb) => {
            fb.getConversations((conversations) => {
              console.log(conversations);
              res.render('conversations', { conversations: conversations });
            });
          })
          .catch((err) => console.log('Failed to login:' + err));
});

module.exports = router;
