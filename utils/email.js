
var EMAIL_ENABLED = process.env.FROM_EMAIL && process.env.POSTMARK_API_TOKEN;

if (!EMAIL_ENABLED) {
  console.log('Warning: FROM_EMAIL or POSTMARK_API_TOKEN not set. Email functionality disabled.');
}

var postmark = EMAIL_ENABLED ? require("postmark")(process.env.POSTMARK_API_TOKEN) : null;
var async = require('async');
var crypto = require('crypto');

function sendWelcomeEmail(user, host, finalCB) {
  if (!EMAIL_ENABLED) {
    console.log('Email disabled - Welcome email would be sent to:', user.email);
    if (finalCB) finalCB();
    return;
  }
  host = host.indexOf('localhost') >= 0 ? 'http://' + host : 'https://' + host;

  async.waterfall([
      function(done) {
        crypto.randomBytes(15, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        user.verifyEmailToken = token;
        user.verifyEmailTokenExpires = Date.now() + 3600000 * 24; // 24 hours
        user.isEmailVerified = false; 
        user.save(function(err) {
          done(err, user);
        });
      },
      function(user, done) {
        postmark.sendEmailWithTemplate({
          "From": process.env.FROM_EMAIL,
          "To": user.email,
          "TemplateId": 491642,
          "TemplateModel": {
            "product_name": "React Redux Blog",
            "name": user.name,
            "action_url": host + '/validateEmail/' + user.verifyEmailToken,
            "username": user.username,
            "sender_name": "Redux Team",
            'sender_name_Value': 'Raja',
            'product_name_Value': 'React-Redux-Blog',
            "product_address_line1": "One Market",
            "product_address_line2": "San Francisco"
          }
        }, done);
      }
    ],
    function(err) {
      if (err) {
        console.log('Could not send welcome email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send welcome email to: ' + user.email
          });
        }
      } else {
        if (finalCB) {
          finalCB();
        }
      }
    });

}

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail
};