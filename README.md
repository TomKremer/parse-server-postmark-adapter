# parse-server-postmark-adapter

Used to send Parse Server password reset and email verification emails through Postmark. You can also send using Postmark Templates.

## Installation:

```bash
npm install https://github.com/TomKremer/parse-server-postmark-adapter --save
```

## Usage:

```js
const emailAdapter = {
  module: "parse-server-postmark-adapter",
  options: {
    apiKey: "",
    fromAddress: "",
    displayName: "",
    passwordResetSubject: "",
    passwordResetTemplateAlias: "",
  },
};

// ...

const server = new ParseServer({
  // ...
  appName: "My app",
  publicServerURL: "http://localhost:1337/parse",
  emailAdapter, // include your postmark options here
});
```

## Cloud Code

```js
import { AppCache } from "parse-server/lib/cache.js";

Parse.Cloud.define("exampleFunction", async (req) => {
  const MailAdapter = AppCache.get("your-app-name-here").userController.adapter;
  try {
    const response = await MailAdapter.sendMailTemplate({
      templateAlias: "",
      From: "",
      To: "",
      templateModel: {
        postalcode: "",
        someLink: "",
      },
      Tag: "some-tag",
    });

    // ...
  }catch(e) {
    throw new Parse.Error(141, "Could not send message");
  }
```
