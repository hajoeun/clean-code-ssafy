const { sum, add10, add30 } = require('./v2/fp');

describe('test fp functions', () => {
  test('sum should be return 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('sum should be return 40', () => {
    expect(sum(20, 20)).toBe(40);
  });

  test('add10 should be return 40', () => {
    expect(add10(30)).toBe(40);
  });

  test('add30 should be return 40', () => {
    expect(add30(10)).toBe(40);
  });
});
