import { Client } from 'postmark';

const PostmarkAdapter = ({ apiKey, fromAddress }) => {
  if (!apiKey) {
    throw new Error('PostmarkAdapter requires an API Key. You might obtain an API Token from your Postmark account settings.'); // eslint-disable-line max-len
  } else if (!fromAddress) {
    throw new Error('PostmarkAdapter requires fromAddress.');
  }

  const client = new Client(apiKey);

  const sendMail = ({ to, subject, text }) => new Promise((resolve, reject) => {
    client.sendEmail({
      From: fromAddress,
      To: to,
      Subject: subject,
      TextBody: text,
    }, (err, body) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(`Unable to send via postmark: ${err.message}`);
        reject(err);
      }
      resolve(body);
    });
  });

  return Object.freeze({
    sendMail,
  });
};

module.exports = PostmarkAdapter;
