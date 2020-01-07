const { sum } = require('./fp');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 10 + 10 to equal 20', () => {
  expect(sum(10, 10)).toBe(20);
});

test('adds 15 + 15 to equal 30', () => {
  expect(sum(15, 15)).toBe(30);
});