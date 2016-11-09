let login = require('facebook-chat-api');
let util = require('util');
let fs = require('fs');
let async = require('async');

let email = process.env.FB_EMAIL;
let password = process.env.FB_PASSWORD;
let threadId = process.env.THREAD_ID;

// Create simple echo bot
login({ email: email, password: password }, (err, api) => {
  if (err) return console.error(err);

  if (!threadId) {
    api.getThreadList(0, 50, 'inbox', (err, arr) => {
      arr.forEach((item) => {
        api.getThreadInfo(item.threadID, (err, info) => {
          console.log({
            threadId: item.threadID,
            name: info.name,
            numberOfMessage: info.messageCount,
          });
        });
      });
    });
  } else {
    api.getThreadInfo(threadId, (err, info) => {
      console.log(`Thread with: ${info.name}`);
      console.log(`Starting download of ${info.messageCount} messages...`);

      let iteration = 0;
      let chunkSize = 9999;
      let lastTimestamp = +Date.now();
      let allMessages = [];
      async.until(() => (iteration * chunkSize) > info.messageCount, (callback) => {
        api.getThreadHistory(threadId, 0, chunkSize, lastTimestamp, (err, history) => {
          if (err) { console.log(err); }

          allMessages = history.concat(allMessages);
          lastTimestamp = history[0].timestamp - 1;
          iteration++;
          console.log(`Downloaded ${allMessages.length} messages...`);
          callback();
        });
      }, () => {
        fs.writeFileSync('./data.json', JSON.stringify(allMessages, null, 2), 'utf-8');
        console.log('Download completed. See `data.json` file.');
      });
    });
  }
});
