const { sum, add10 } = require('./fp');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds10 to equal 12', () => {
  expect(add10(2)).toBe(12);
});