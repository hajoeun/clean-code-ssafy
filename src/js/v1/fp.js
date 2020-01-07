const compose = (f1, f2) => {
  return data => {
    return f2(f1(data));
  };
};

const sum = (a, b) => {
  return a + b;
};
const add10 = (x) => sum(x, 10);

const add20 = compose(add10, add10);

module.exports = {
  sum, add10, add20
};