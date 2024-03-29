const util = require('../../../utils/util');
const mockRequest = require('../../fixtures/request/deleteOneItem.json');
const mockRequestSNS = require('../../fixtures/request/deleteFromSNS.json');

describe('extractVariablesFromRequest', () => {
  const events = mockRequest;
  test('With Data: Success', async () => {
    const response = await util
      .extractVariablesFromRequest(events);

    expect(response.pk).not.toBeUndefined();
    expect(response.sk).not.toBeUndefined();
    expect(response.fromSns).not.toBeUndefined();
  });

  test('With Data Delete from SNS: Success', async () => {
    const response = await util
      .extractVariablesFromRequest(mockRequestSNS);

    expect(response.pk).not.toBeUndefined();
    expect(response.sk).not.toBeUndefined();
    expect(response.fromSns).not.toBeUndefined();
    expect(response.fromSns).toBe(true);
  });

  test('Without Data Delete from SNS: Success', async () => {
    const response = await util
      .extractVariablesFromRequest({
        'body-json': {
          pk: 'Wallet#123',
          sk: 'Category#123',
        },
      });

    expect(response.pk).not.toBeUndefined();
    expect(response.sk).not.toBeUndefined();
    expect(response.fromSns).not.toBeUndefined();
    expect(response.fromSns).toBe(false);
  });
});

describe('isNotEmpty', () => {
  test('With Data: Success', () => {
    expect(util.isNotEmpty('en')).toBe(true);
    expect(util.isNotEmpty(1)).toBe(true);
    expect(util.isNotEmpty(true)).toBe(true);
    expect(util.isNotEmpty({
      notEmpty: true,
    })).toBe(true);
  });

  test('Without Data: Success', () => {
    expect(util.isNotEmpty('')).toBe(false);
    expect(util.isNotEmpty(null)).toBe(false);
    expect(util.isNotEmpty({})).toBe(false);
  });
});
