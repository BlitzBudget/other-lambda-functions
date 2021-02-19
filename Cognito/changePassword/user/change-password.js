const ChangePassword = () => {};

const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

ChangePassword.prototype.changePassword = (params) => new Promise((resolve, reject) => {
  cognitoidentityserviceprovider.changePassword(params, (err, data) => {
    if (err) {
      console.log(err, err.stack); // an error occurred
      reject(err);
    } else {
      console.log(data); // successful response
      resolve(data);
    }
  });
});

// Export object
module.exports = new ChangePassword();