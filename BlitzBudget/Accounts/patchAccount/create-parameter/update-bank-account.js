const parameters = require('../utils/parameters');
const util = require('../utils/util');

module.exports.createParameter = (event) => {
  let updateExp = 'set';
  const expAttrVal = {};
  const expAttrNames = {};

  if (util.isEmpty(event['body-json'])) {
    console.log('The event body is empty, Request invalid');
    return undefined;
  }

  for (let i = 0, len = parameters.length; i < len; i++) {
    const prm = parameters[i];

    // If the parameter is not found then do not save
    if (util.isNotEmpty(event['body-json'][prm.prmName])) {
      // Add a comma to update expression
      if (util.includesStr(updateExp, '#variable')) {
        updateExp += ',';
      }

      console.log(`param name - ${event['body-json'][prm.prmName]}`);

      updateExp += ` #variable${i} = :v${i}`;
      expAttrVal[`:v${i}`] = event['body-json'][prm.prmName];
      expAttrNames[`#variable${i}`] = prm.prmValue;
    }
  }

  console.log(
    ' update expression ',
    JSON.stringify(updateExp),
    ' expression attribute value ',
    JSON.stringify(expAttrVal),
    ' expression Attribute Names ',
    JSON.stringify(expAttrNames),
    ' for the account id ',
    event['body-json'].accountId,
  );

  if (util.isEmpty(expAttrVal)) {
    console.log('The event body is does not have a valid parameters to update, Request invalid');
    return undefined;
  }

  updateExp += ', #update = :u';
  expAttrVal[':u'] = new Date().toISOString();
  expAttrNames['#update'] = 'updated_date';

  return {
    TableName: process.env.TABLE_NAME,
    Key: {
      pk: event['body-json'].walletId,
      sk: event['body-json'].accountId,
    },
    UpdateExpression: updateExp,
    ExpressionAttributeNames: expAttrNames,
    ExpressionAttributeValues: expAttrVal,
  };
};
