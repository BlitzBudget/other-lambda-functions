const deleteBatch = require('../../index');
const mockRequest = require('../fixtures/request/deleteBatch.json');

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      batchWrite: jest.fn(() => ({
        promise: jest.fn().mockResolvedValueOnce({}),
      })),
    })),
  },
  config: {
    update: jest.fn(),
  },
  SNS: jest.fn(() => ({
    publish: jest.fn(() => ({
      promise: jest.fn().mockRejectedValueOnce({}),
    })),
  })),
}));

describe('Delete One Item item', () => {
  const event = mockRequest;
  test('With Data: Error SNS', async () => {
    await deleteBatch
      .handler(event).catch((err) => {
        expect(err).not.toBeUndefined();
      });
  });
});
