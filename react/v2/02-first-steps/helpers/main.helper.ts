export const add = (a: number, b: number) => {
  // a++;
  return a + b;
};

export const substract = (a: number, b: number) => {
  return a - b;
};

export const multiply = (a: number, b: number) => {
  return a * b;
};

export const divide = (a: number, b: number) => {
  if (b === 0) {
    console.error("No se puede dividir entre cero.")
    return;
  }
  return a / b;
};
