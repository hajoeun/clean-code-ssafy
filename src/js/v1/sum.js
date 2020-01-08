const compose = (f1, f2) => {
  return (data) => {
    return f2(f1(data));
  };
};

const sum = (a, b) => a + b;
const add10 = x => {
  return sum(x, 10);
};
const add20 = compose(add10, add10);

module.exports = {
  sum, add10
};