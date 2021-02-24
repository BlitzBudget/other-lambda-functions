const ResendConfirmation = () => {};

const AWS = require('aws-sdk');
const constants = require('../constants/constant');

AWS.config.update({ region: constants.EU_WEST_ONE });
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

ResendConfirmation.prototype.resendConfirmationCode = (params) => new Promise((resolve, reject) => {
  cognitoidentityserviceprovider.resendConfirmationCode(
    params,
    (err, data) => {
      if (err) {
        console.log(err, err.stack); // an error occurred
        reject(err);
      } else {
        console.log(data); // successful response
        resolve(data);
      }
    },
  );
});

// Export object
module.exports = new ResendConfirmation();