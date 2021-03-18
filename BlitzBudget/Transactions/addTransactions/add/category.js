const AddCategory = () => {};

async function createCategoryItem(event, skForCategory, categoryName, documentClient) {
  function createParameters() {
    return {
      TableName: 'blitzbudget',
      Key: {
        pk: event['body-json'].walletId,
        sk: skForCategory,
      },
      UpdateExpression:
        'set category_total = :r, category_name = :p, category_type = :q, date_meant_for = :s, creation_date = :c, updated_date = :u',
      ExpressionAttributeValues: {
        ':r': 0,
        ':p': categoryName,
        ':q': event['body-json'].categoryType,
        ':s': event['body-json'].dateMeantFor,
        ':c': new Date().toISOString(),
        ':u': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    };
  }

  const params = createParameters();

  console.log('Adding a new item...');
  const response = await documentClient.update(params).promise();

  return {
    Category: response.Attributes,
  };
}

AddCategory.prototype.createCategoryItem = createCategoryItem;
// Export object
module.exports = new AddCategory();
