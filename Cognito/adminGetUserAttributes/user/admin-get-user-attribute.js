const AdminGetUser = () => {};

const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });
const cognitoIdServiceProvider = new AWS.CognitoIdentityServiceProvider();

// Get User Attributes
AdminGetUser.prototype.getUser = (params) => new Promise((resolve, reject) => {
  cognitoIdServiceProvider.adminGetUser(params, (err, data) => {
    if (err) reject(err);
    // an error occurred
    else resolve(data); // successful response
  });
});

// Export object
module.exports = new AdminGetUser();
