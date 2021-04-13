const addDateParameter = require('../../../create-parameter/add-date');
const mockRequest = require('../../fixtures/request/addBudget');

describe('addDateParameter: createParameter', () => {
  mockRequest['body-json'].categoryType = 'random';
  const event = mockRequest;
  test('With Data: Success', () => {
    const parameters = addDateParameter.createParameter(event, 'randomValue', 'name');
    expect(parameters).not.toBeUndefined();
    expect(parameters.TableName).not.toBeUndefined();
    expect(parameters.Key).not.toBeUndefined();
    expect(parameters.Key.pk).not.toBeUndefined();
    expect(parameters.Key.sk).not.toBeUndefined();
    expect(parameters.UpdateExpression).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues[':r']).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues[':p']).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues[':c']).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues[':a']).not.toBeUndefined();
    expect(parameters.ExpressionAttributeValues[':u']).not.toBeUndefined();
    expect(parameters.ReturnValues).not.toBeUndefined();
  });
});