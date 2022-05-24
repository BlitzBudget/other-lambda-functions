const util = require('../../../utils/util');
const mockUser = require('../../fixtures/response/get-user');

describe('includesStr', () => {
  test('With Data: Success', () => {
    expect(util.includesStr(['en', 'es'], 'es')).toBe(true);
    expect(util.includesStr('falstru', 'tru')).toBe(true);
    expect(util.includesStr('falstru', 'tr')).toBe(true);
  });

  test('With False Data: Success', () => {
    expect(util.includesStr(['en', 'es'], 'e')).toBe(false);
    expect(util.includesStr(['false', 'true'], 'tru')).toBe(false);
    expect(util.includesStr(['fals', 'tru'], 'true')).toBe(false);
  });

  test('Without Data: Success', () => {
    expect(util.includesStr(['en', 'es'], '')).toBe(false);
    expect(util.includesStr([], 'en')).toBe(false);
  });
});

describe('fetchUserId', () => {
  test('With Data: Success', () => {
    const userId = util.fetchUserId(mockUser);
    expect(userId).not.toBeUndefined();
    expect(userId).toBe(mockUser.UserAttributes[2].Value);
  });

  test('With False Data: Success', () => {
    const userId = util.fetchUserId({});
    expect(userId).toBeUndefined();
  });

  test('Without Data: Success', () => {
    const userId = util.fetchUserId({ UserAttributes: {} });
    expect(userId).toBeUndefined();
  });
});

describe('isEmpty', () => {
  test('With Data: Success', () => {
    expect(util.isEmpty('en')).toBe(false);
    expect(util.isEmpty(1)).toBe(false);
    expect(util.isEmpty(true)).toBe(false);
    expect(util.isEmpty({
      notempty: true,
    })).toBe(false);
  });

  test('Without Data: Success', () => {
    expect(util.isEmpty('')).toBe(true);
    expect(util.isEmpty(null)).toBe(true);
    expect(util.isEmpty({})).toBe(true);
  });
});
