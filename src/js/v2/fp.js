const pipe = (...fns) => (number) => {
  return fns.reduce((acc, fn) => fn(acc), number);
};

const sum = (a, b) => a + b;
const add10 = (a) => sum(a, 10);

const add30 = pipe(add10, add10, add10);

module.exports = {
  sum, add10, add30
};
