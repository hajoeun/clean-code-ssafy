const compose = (...fns) => {
  return (arg) => {
    return fns.reduce((acc, fn) => {
      return fn(acc);
    }, arg);
  }
};

const sum = (a, b) => a + b;
const add10 = x => sum(x, 10);
const add20 = compose(add10, add10);
const add40 = compose(add10, add10, add10, add10);

module.exports = { sum, add10 };