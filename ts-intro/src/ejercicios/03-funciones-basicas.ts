function sumar(a: number, b: number): number {
  return a + b;
}

const sumarFlecha = (a: number, b: number): number => {
  return a + b;
};

function multiplicar(
  numero: number,
  base: number,
  otroNumero?: number
): number {
  return numero * base;
}
const resultado = sumar(5, 6);
const resultMult = multiplicar(5, 10);

console.log(resultado);
console.log(resultMult);
