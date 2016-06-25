# parse-server-postmark-adapter
[![Dependency Status](https://david-dm.org/glennreyes/parse-server-postmark-adapter.svg)](https://david-dm.org/glennreyes/parse-server-postmark-adapter)
[![npm version](https://badge.fury.io/js/parse-server-postmark-adapter.svg)](https://badge.fury.io/js/parse-server-postmark-adapter)

Used to send Parse Server password reset and email verification emails through Postmark

## Installation:

```bash
npm install parse-server-postmark-adapter --save
```

## Usage:

```js
const PostmarkAdapter = require('parse-server-postmark-adapter');

// ...

const server = new ParseServer({

  // ...

  appName: 'My app',
  publicServerURL: 'http://localhost:1337/parse',
  verifyUserEmails: true, // Enable email verification
  emailAdapter: PostmarkAdapter({
    apiKey: 'your-postmark-server-api-token',
    fromAddress: 'your-email@postmark-sender-signatures.com',
  }),
});

// ...
```

## License
MIT
