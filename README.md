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
    // Verification email subject
    verificationSubject: 'Please verify your e-mail for *|appname|*',
    // Verification email body. This will be ignored when verificationTemplateName is used.
    verificationBody: 'Hi *|username|*,\n\nYou are being asked to confirm the e-mail address *|email|* with *|appname|*\n\nClick here to confirm it:\n*|link|*',
    // Password reset email subject
    passwordResetSubject: 'Password Reset Request for *|appname|*',
    // Password reset email body. This will be ignored when passwordResetTemplateName is used.
    passwordResetBody: 'Hi *|username|*,\n\nYou requested a password reset for *|appname|*.\n\nClick here to reset it:\n*|link|*',

    /****************************************
    * If you are using Postmark templates: *
    ****************************************/

    //
    // If you want to use other custom User attributes in the emails
    // (for example: firstName, lastName), add them to the list (username and email 
    // are pre-loaded).
    // The merge tag in the template must be equal to the attribute's name.
    customUserAttributesMergeTags: ['firstname', 'lastname'],

    //
    // The name of your Mandrill template for the password reset email:
    // If you add this attribute, then passwordResetBody will be ignored.
    // IMPORTANT: Make sure the email has the *|link|* merge tag,
    //            it will render the url to reset the password.
    passwordResetTemplateId: 'password-reset-template-name',

    //
    // The name of your Mandrill template for the verification email:
    // If you add this attribute, then verificationBody will be ignored.
    // IMPORTANT: Make sure the email has the *|link|* merge tag,
    //            it will render the url to verify the user.
    verificationTemplateId: 'email-verification-template-name',
  }),
});

// ...
```

## License
MIT
