function RecurringTransaction() {}

const recurringTransaction = require('../create-parameter/recurring-transaction');

// Get all transaction Items
RecurringTransaction.prototype.getRecurringTransactionItems = async (
  walletId,
  documentClient,
) => {
  const params = recurringTransaction.createParameter(walletId);

  // Call DynamoDB to read the item from the table
  const response = await documentClient.query(params).promise();
  return response;
};

// Export object
module.exports = new RecurringTransaction();
