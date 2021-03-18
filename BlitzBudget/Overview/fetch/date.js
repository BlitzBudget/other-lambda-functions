const FetchDate = () => {};

const constants = require('../constants/constant');

async function getDateData(pk, startsWithDate, endsWithDate, documentClient) {
  function organizeRetrievedItems(data) {
    console.log('data retrieved - Date ', data.Count);
    if (data.Items) {
      Object.keys(data.Items).forEach((dateObj) => {
        const date = dateObj;
        date.dateId = dateObj.sk;
        date.walletId = dateObj.pk;
        delete date.sk;
        delete date.pk;
      });
    }
  }

  function createParameters() {
    return {
      TableName: constants.TABLE_NAME,
      KeyConditionExpression: 'pk = :pk and sk BETWEEN :bt1 AND :bt2',
      ExpressionAttributeValues: {
        ':pk': pk,
        ':bt1': `Date#${startsWithDate}`,
        ':bt2': `Date#${endsWithDate}`,
      },
      ProjectionExpression: 'pk, sk, income_total, expense_total, balance',
    };
  }

  const params = createParameters();

  // Call DynamoDB to read the item from the table
  const response = await documentClient.query(params).promise();

  organizeRetrievedItems(response);
  return ({
    Date: response.Items,
  });
}

FetchDate.prototype.getDateData = getDateData;
// Export object
module.exports = new FetchDate();
