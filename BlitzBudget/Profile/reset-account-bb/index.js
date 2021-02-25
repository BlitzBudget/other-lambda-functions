const AWS = require('aws-sdk');
const deleteHelper = require('./utils/delete-helper');
const publish = require('./sns/publish');
const constants = require('./constants/constant');

AWS.config.update({
  region: constants.EU_WEST_ONE,
});
// Delete User
const cognitoIdServiceProvider = new AWS.CognitoIdentityServiceProvider();

const sns = new AWS.SNS();

exports.handler = async (event) => {
  // console.log(" Events ", JSON.stringify(event));

  // Concurrently call multiple APIs and wait for the response
  // Params delete add the userName field
  const events = deleteHelper.handleDeleteAccount(
    event,
    cognitoIdServiceProvider,
  );

  events.push(publish.resetAccountSubscriberThroughSNS(event, sns));
  const result = await Promise.all(events);
  console.log(
    `The reset account for ${
      event['body-json'].walletId
    } was ${
      JSON.stringify(result)}`,
  );

  return { result };
};
