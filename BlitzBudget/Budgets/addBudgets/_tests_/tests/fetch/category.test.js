const fetchCategory = require('../../../fetch/category');
const mockRequest = require('../../fixtures/request/addBudget.json');
const mockResponse = require('../../fixtures/response/fetch-category.json');

const documentClient = {
  query: jest.fn(() => ({
    promise: jest.fn().mockResolvedValueOnce(mockResponse),
  })),
};

describe('Fetch Category item', () => {
  test('Without Matching Category: Success', async () => {
    const response = await fetchCategory
      .getCategoryData(mockRequest, new Date(), documentClient);
    expect(response).not.toBeUndefined();
    expect(response.Category).toBeUndefined();
    expect(documentClient.query).toHaveBeenCalledTimes(1);
  });

  test('With Matching Category', async () => {
    mockRequest['body-json'].category = 'Salary';

    const withCategoryResponse = await fetchCategory
      .getCategoryData(mockRequest, new Date(), documentClient);
    expect(withCategoryResponse).not.toBeUndefined();
    expect(withCategoryResponse.Category).not.toBeUndefined();
    expect(withCategoryResponse.Category.category_name).toBe(mockRequest['body-json'].category);
    expect(withCategoryResponse.Category.category_type).toBe(mockRequest['body-json'].categoryType);
  });

  test('Without A Response: Success', async () => {
    const documentClientWithoutAResponse = {
      query: jest.fn(() => ({
        promise: jest.fn().mockResolvedValueOnce({
          Items: [],
          Count: 0,
        }),
      })),
    };

    const response = await fetchCategory
      .getCategoryData(mockRequest, new Date(), documentClientWithoutAResponse);
    expect(response).not.toBeUndefined();
    expect(response.Category).toBeUndefined();
    expect(documentClientWithoutAResponse.query).toHaveBeenCalledTimes(1);
  });
});
