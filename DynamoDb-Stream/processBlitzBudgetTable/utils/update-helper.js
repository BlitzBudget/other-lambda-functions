const UpdateHelper = () => { };

const AWS = require('aws-sdk');
const helper = require('./helper');

const constants = require('../constants/constant');
const addBankAccount = require('../add/bank-account');
const updateAccountHelper = require('./update-account-helper');
const updateCategoryHelper = require('./update-category-helper');
const updateDateHelper = require('./update-date-helper');
const updateWalletHelper = require('./update-wallet-helper');

// Load the AWS SDK for Node.js
// Set the region
AWS.config.update({
  region: constants.EU_WEST_ONE,
});

// Create the DynamoDB service object
const documentClient = new AWS.DynamoDB.DocumentClient();

async function updateRelevantItems(event) {
  const events = [];

  console.log('Received event:', JSON.stringify(event, null, 2));
  event.Records.forEach((record) => {
    try {
      const sortKey = record.dynamodb.Keys.sk.S;
      console.log('Started processing the event with the sort key %j', sortKey);
      console.log('Started processing the event with id %j', record.eventID);
      console.log('The event name is %j', record.eventName);

      // If the entries are not transactions / bank accounts then do not process
      if (helper.includesStr(sortKey, 'Transaction#')) {
        console.log('Updating the category total and account balance');
        updateCategoryHelper.updateCategoryTotal(record, events, documentClient);
        updateAccountHelper.updateAccountBalance(record, events, documentClient);
      } else if (helper.includesStr(sortKey, 'BankAccount#')) {
        console.log('Updating the wallet account balance');
        updateWalletHelper.updateWalletBalance(record, events, documentClient);
      } else if (helper.includesStr(sortKey, 'Wallet#') && helper.isEqual(record.eventName, 'INSERT')) {
        console.log('Adding a new bank account for the newly created wallet');
        events.push(addBankAccount.addNewBankAccount(record, documentClient));
      } else if (helper.includesStr(sortKey, 'Category#')) {
        console.log('Updating the date wrapper with the total');
        updateDateHelper.updateDateTotal(record, events, documentClient);
      }
    } catch (ex) {
      console.log('Could not complete operation', ex);
      console.log('The record that could not be process is %j', JSON.stringify(record));
    }
  });

  async function fulfillPromise() {
    try {
      await Promise.all(events);
    } catch (ex) {
      console.log('Could not complete operation ', ex);
    }
  }

  await fulfillPromise();
}

UpdateHelper.prototype.updateRelevantItems = updateRelevantItems;
// Export object
module.exports = new UpdateHelper();
