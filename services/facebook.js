let async = require('async');
let facebookChatApi = require('facebook-chat-api');
let fs = require('fs');
let util = require('util');

let accounts = [];
class Facebook {
  static login(email, password) {
    return new Promise((resolve, reject) => {
      facebookChatApi({email: email, password: password }, (err, api) => {
        if (err) reject(err);
        resolve(new Facebook(api));
      });
    });
  }

  constructor(api) {
    this.api = api;
  }

  getConversations(callback) {
    this.api.getThreadList(0, 10, 'inbox', (err, rawConversations) => {
      async.map(rawConversations, (raw, done) => {
        this.api.getThreadInfo(raw.threadID, (err, conversation) => {
          raw.full = conversation;
          done(null, raw);
        });
      }, (err, conversations) => {
        if (err) console.log(err);
        callback(conversations);
      });
    });
  }
}

module.exports = Facebook;
