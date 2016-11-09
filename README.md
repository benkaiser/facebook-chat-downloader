## ⬇ Facebook Chat Downloader ⬇

Download the raw json of an entire facebook chat history.

### Installation

Requires node.js 6+

Run:

```
npm install
```

or if you have [yarn](https://yarnpkg.com/)

```
yarn --ignore-engines
```

### Usage

On first run, it will dump a list of the 50 most recent threads, look at the `snippet` in these threads and pick the threadID for the conversation you want:

```
$ FB_EMAIL=your_email FB_PASSWORD=your_password npm start
{ threadId: '1234567890',
  name: 'Your Friend',
  numberOfMessage: 321 }
{ threadId: '1234567810',
...
```

Then once you have selected a threadID for the conversation, re-run with the
that threadID set:

```
$ FB_EMAIL=your_email FB_PASSWORD=your_password THREAD_ID=your_thread_id npm start
Thread with: Your Friend
Starting download of 12345 messages...
Downloaded 10000 messages...
Downloaded 12345 messages...
Download completed. See `data.json` file.
```

💥 You are done! All message data will be in the `data.json` file!
