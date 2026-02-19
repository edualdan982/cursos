const charactersName = ["Goku", "Vegeta", "Trunks"];

const [, , p3] = charactersName;

console.log({ p3 });

const returnsArrayFn = () => {
  return ["ABC", 1234] as const;
};

const [letters, numbers] = returnsArrayFn();


console.log({ letters, numbers });