## ⬇ Facebook Chat Downloader ⬇

I host an instance of this at [facebook-download.kaiserapps.com](https://facebook-download.kaiserapps.com/).

However if you are the privacy concious kind or would just like to run it yourself, follow the below developer instructions.

### Developer Instructions

#### Running in Docker + Docker Compose

```
bin/go
```

And you're done! Good to go! try it out on http://localhost:3000

#### Without Docker

You'll need:
- Node.js 6
- Redis running

then execute

```
yarn --ignore-engines
npm start
```

You can also pass the `REDIS_URL` environment variable to the process to set the correct redis instance. 
