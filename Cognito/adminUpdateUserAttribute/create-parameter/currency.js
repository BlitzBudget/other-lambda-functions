const helper = require('../utils/helper');

module.exports.createParameter = (event, params, index) => {
  const parameter = params;
  let i = index;
  if (helper.isNotEmpty(event['body-json'].currency)) {
    parameter.UserAttributes[i] = {
      Name: 'custom:currency',
      Value: event['body-json'].currency,
    };
    i += 1;
  }
  return i;
};