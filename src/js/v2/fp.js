const pipe = (...fns) => (number) => {
  return fns.reduce((acc, fn) => fn(acc), number);
};

const sum = (a, b) => a + b;
const add10 = (a) => sum(a, 10);
const sub10 = (a) => sum(a, -10);
const mult4 = (a) => a * 4;

const add60 = pipe(
  add10,
  add10,
  add10,
  add10,
  add10,
  add10
);

const cal = pipe(
  add60,
  sub10,
  sub10,
  mult4,
  console.log
);

cal(10);
