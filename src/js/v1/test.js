const { sum, add10 } = require('./fp');

describe('fp functions test', () => {

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test('adds 2 + 2 to equal 4', () => {
    expect(sum(2, 2)).toBe(4);
  });
  test('add10 + 20 to equal 30', () => {
    expect(add10(20)).toBe(30);
  });

});