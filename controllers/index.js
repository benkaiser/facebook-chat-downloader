var express = require('express');
var router = express.Router();

var Facebook = require('../services/facebook');

var FileTypes = {
  'txt': require('../wrappers/text'),
  'csv': require('../wrappers/csv'),
  'json': require('../wrappers/json'),
};

function redirectIfNoCredentials(req, res, next) {
  if (req.session.email && req.session.password) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
  req.session.email = req.body.email;
  req.session.password = req.body.password;
  res.redirect('/conversations');
});

router.get('/conversations', redirectIfNoCredentials, (req, res) => {
  Facebook.login(req.session.email, req.session.password)
          .then((fb) => {
            fb.getConversations((conversations) => {
              console.log(conversations);
              res.render('conversations', {
                conversations: conversations,
                methods: FileTypes
              });
            });
          })
          .catch((err) => res.send(err));
});

router.get('/conversations/:thread.:method', (req, res) => {
  let thread = req.params.thread;
  let method = req.params.method;
  Facebook.login(req.session.email, req.session.password)
          .then((fb) => {
            fb.getConversation(thread, (conversations) => {
              res.writeHead(200, {
                'Content-Type': 'application/force-download',
                'Content-disposition':`attachment; filename=${thread}.${method}`
              });
              let dataWrapper = new FileTypes[method](conversations);
              res.end(dataWrapper.convert());
            });
          })
          .catch((err) => res.send(err));
});

module.exports = router;
