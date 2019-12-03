'use strict';

var _postmark = require('postmark');

var _postmark2 = _interopRequireDefault(_postmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable*/
var PostmarkAdapter = function PostmarkAdapter(postmarkOptions) {
  if (!postmarkOptions || !postmarkOptions.apiKey || !postmarkOptions.fromAddress) {
    throw new Error('PostmarkAdapter requires an API Key and a From Email Address.');
  }

  postmarkOptions.replyTo = postmarkOptions.replyTo || postmarkOptions.fromAddress;
  postmarkOptions.displayName = postmarkOptions.displayName || postmarkOptions.replyTo;
  postmarkOptions.verificationSubject = postmarkOptions.verificationSubject || 'Please verify your e-mail for *|appname|*';
  postmarkOptions.verificationBody = postmarkOptions.verificationBody || 'Hi,\n\nYou are being asked to confirm the e-mail address *|email|* ' + 'with *|appname|*\n\nClick here to confirm it:\n*|link|*';
  postmarkOptions.passwordResetSubject = postmarkOptions.passwordResetSubject || 'Password Reset Request for *|appname|*';
  postmarkOptions.passwordResetBody = postmarkOptions.passwordResetBody || 'Hi,\n\nYou requested a password reset for *|appname|*.\n\nClick here ' + 'to reset it:\n*|link|*';
  postmarkOptions.customUserAttributesMergeTags = postmarkOptions.customUserAttributesMergeTags || [];

  var postmarkClient = new _postmark2.default.ServerClient(apiKey);

  var sendVerificationEmail = function sendVerificationEmail(options) {
    var messageData = {
      appname: options.appName,
      username: options.user.get("username"),
      email: options.user.get("username"),
      link: options.link
    };

    if (typeof postmarkOptions.customUserAttributesMergeTags !== 'undefined') {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = postmarkOptions.customUserAttributesMergeTags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var extra_attr = _step.value;

          messageData[extra_attr] = options.user.get(extra_attr) || '';
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    return new Promise(function (resolve, reject) {
      if (postmarkOptions.verificationTemplateId) {
        var message = {
          From: postmarkOptions.fromAddress,
          To: options.user.get("email") || options.user.get("username"),
          Subject: postmarkOptions.verificationSubject,
          TemplateId: postmarkOptions.verificationTemplateId,
          TemplateModel: messageData
        };
        postmarkClient.sendEmailWithTemplate(message, function (error, result) {
          if (error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
          }
          console.info("Sent to postmark for delivery");
        });
      } else {
        var message = {
          From: postmarkOptions.fromAddress,
          To: options.to,
          Subject: options.subject,
          TextBody: options.text
        };
        postmarkClient.sendEmail(message, function (error, result) {
          if (error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
          }
          console.info("Sent to postmark for delivery");
        });
      }
    });
  };

  var sendPasswordResetEmail = function sendPasswordResetEmail(options) {

    var messageData = {
      appname: options.appName,
      username: options.user.get("username"),
      email: options.user.get("username"),
      link: options.link
    };

    if (typeof postmarkOptions.customUserAttributesMergeTags !== 'undefined') {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = postmarkOptions.customUserAttributesMergeTags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var extra_attr = _step2.value;

          messageData[extra_attr] = options.user.get(extra_attr) || '';
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    return new Promise(function (resolve, reject) {
      if (postmarkOptions.passwordResetTemplateId) {
        var message = {
          From: postmarkOptions.fromAddress,
          To: options.user.get("email") || options.user.get("username"),
          Subject: postmarkOptions.passwordResetSubject,
          TemplateId: postmarkOptions.passwordResetTemplateId,
          TemplateModel: messageData
        };
        postmarkClient.sendEmailWithTemplate(message, function (error, result) {
          if (error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
          }
          console.info("Sent to postmark for delivery");
        });
      } else {
        var message = {
          From: postmarkOptions.fromAddress,
          To: options.to,
          Subject: options.subject,
          TextBody: options.text
        };
        postmarkClient.sendEmail(message, function (error, result) {
          if (error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
          }
          console.info("Sent to postmark for delivery");
        });
      }
    });
  };

  var sendMail = function sendMail(options) {
    var message = {
      From: postmarkOptions.fromAddress,
      To: options.to,
      Subject: options.subject,
      TextBody: options.text
    };

    return new Promise(function (resolve, reject) {
      postmarkClient.sendEmail(message, function (error, result) {
        if (error) {
          console.error("Unable to send via postmark: " + error.message);
          return;
        }
        console.info("Sent to postmark for delivery");
      });
    });
  };

  return Object.freeze({
    sendVerificationEmail: sendVerificationEmail,
    sendPasswordResetEmail: sendPasswordResetEmail,
    sendMail: sendMail
  });
};
/*eslint-enable*/

module.exports = PostmarkAdapter;