//import postmark from 'postmark';
const postmark = require("postmark");

/*eslint-disable*/
const PostmarkAdapter = (postmarkOptions) => {
  if (!postmarkOptions || !postmarkOptions.apiKey || !postmarkOptions.fromAddress) {
    throw new Error("PostmarkAdapter requires an API Key and a From Email Address.");
  }

  postmarkOptions.replyTo = postmarkOptions.replyTo || postmarkOptions.fromAddress;
  postmarkOptions.displayName = postmarkOptions.displayName || postmarkOptions.replyTo;
  postmarkOptions.verificationSubject =
    postmarkOptions.verificationSubject || "Please verify your e-mail for *|appname|*";
  postmarkOptions.verificationBody =
    postmarkOptions.verificationBody ||
    "Hi,\n\nYou are being asked to confirm the e-mail address *|email|* " +
      "with *|appname|*\n\nClick here to confirm it:\n*|link|*";
  postmarkOptions.passwordResetSubject =
    postmarkOptions.passwordResetSubject || "Password Reset Request for *|appname|*";
  postmarkOptions.passwordResetBody =
    postmarkOptions.passwordResetBody ||
    "Hi,\n\nYou requested a password reset for *|appname|*.\n\nClick here " + "to reset it:\n*|link|*";
  postmarkOptions.customUserAttributesMergeTags = postmarkOptions.customUserAttributesMergeTags || [];

  const postmarkClient = new postmark.ServerClient(postmarkOptions.apiKey);

  const sendVerificationEmail = (options) => {
    const messageData = {
      appname: options.appName,
      username: options.user.get("username"),
      email: options.user.get("username"),
      link: options.link,
    };

    if (typeof postmarkOptions.customUserAttributesMergeTags !== "undefined") {
      for (const extra_attr of postmarkOptions.customUserAttributesMergeTags) {
        messageData[extra_attr] = options.user.get(extra_attr) || "";
      }
    }

    return new Promise((resolve, reject) => {
      if (postmarkOptions.verificationTemplateAlias) {
        const message = {
          From: postmarkOptions.fromAddress,
          To: options.user.get("email") || options.user.get("username"),
          Subject: postmarkOptions.verificationSubject,
          TemplateAlias: postmarkOptions.verificationTemplateAlias,
          TemplateModel: messageData,
          Tag: "verify-email",
        };
        postmarkClient.sendEmailWithTemplate(message, (error, result) => {
          if (error) {
            console.error(`Unable to send via postmark: ${error.message}`);
            return;
          }
          console.info("Sent to postmark for delivery");
        });
      } else {
        const message = {
          From: postmarkOptions.fromAddress,
          To: options.to,
          Subject: options.subject,
          TextBody: options.text,
        };
        postmarkClient.sendEmail(message, (error, result) => {
          if (error) {
            console.error(`Unable to send via postmark: ${error.message}`);
            return;
          }
          console.info("Sent to postmark for delivery");
        });
      }
    });
  };

  const sendPasswordResetEmail = (options) => {
    //console.log("sendPasswordResetEmail");
    //console.dir(options, { depth: null });
    const messageData = {
      appname: options.appName,
      username: options.user.get("username"),
      email: options.user.get("username"),
      link: options.link,
    };

    if (typeof postmarkOptions.customUserAttributesMergeTags !== "undefined") {
      for (const extra_attr of postmarkOptions.customUserAttributesMergeTags) {
        messageData[extra_attr] = options.user.get(extra_attr) || "";
      }
    }

    return new Promise((resolve, reject) => {
      if (postmarkOptions.passwordResetTemplateAlias) {
        const message = {
          From: postmarkOptions.fromAddress,
          To: options.user.get("email") || options.user.get("username"),
          /*Subject: postmarkOptions.passwordResetSubject,*/
          TemplateAlias: postmarkOptions.passwordResetTemplateAlias,
          TemplateModel: messageData,
          Tag: "password-reset",
        };
        postmarkClient.sendEmailWithTemplate(message, (error, result) => {
          if (error) {
            console.error(`Unable to send via postmark: ${error.message}`);
            reject(error);
          } else {
            console.info("Sent to postmark for delivery");
            resolve();
          }
        });
      } else {
        const message = {
          From: postmarkOptions.fromAddress,
          To: options.to,
          /*Subject: options.subject,
          TextBody: options.text*/
        };
        postmarkClient.sendEmail(message, (error, result) => {
          if (error) {
            console.error(`Unable to send via postmark: ${error.message}`);
            return;
          }
          console.info("Sent to postmark for delivery");
        });
      }
    });
  };

  const sendMail = (options) => {
    const message = {
      From: postmarkOptions.fromAddress,
      To: options.to,
      Subject: options.subject,
      TextBody: options.text,
    };

    return new Promise((resolve, reject) => {
      postmarkClient.sendEmail(message, (error, result) => {
        if (error) {
          console.error(`Unable to send via postmark: ${error.message}`);
          reject(error);
        }
        console.info("Sent to postmark for delivery");
        resolve();
      });
    });
  };

  const sendMailTemplate = (options) => {
    return postmarkClient.sendEmailWithTemplate(options);
  };

  return Object.freeze({
    sendVerificationEmail: sendVerificationEmail,
    sendPasswordResetEmail: sendPasswordResetEmail,
    sendMail: sendMail,
    sendMailTemplate: sendMailTemplate,
  });
};
/*eslint-enable*/

module.exports = PostmarkAdapter;
