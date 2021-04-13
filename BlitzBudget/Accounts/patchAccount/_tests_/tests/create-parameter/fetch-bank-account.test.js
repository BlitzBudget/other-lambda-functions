const fetchBankParameter = require('../../../create-parameter/fetch-bank-account');
const mockRequest = require('../../fixtures/request/patchAccount');

describe('fetchBankParameter: createParameter', () => {
  const event = mockRequest;
  test('With Data: Success', () => {
    const parameters = fetchBankParameter.createParameter(event['body-json'].walletId);
    expect(parameters).not.toBeUndefined();
    expect(parameters.TableName).not.toBeUndefined();
    expect(parameters.KeyConditionExpression).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues).not.toBeUndefined();
    expect(parameters.ProjectionExpression).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues[':walletId']).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues[':items']).not.toBeUndefined();
  });
});