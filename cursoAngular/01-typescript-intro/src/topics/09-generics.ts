function whatsMyType<T>(argument: T): T {
  return argument;
}

const amIString = whatsMyType<string>('Hola Mundo');
const amINumber = whatsMyType<number>(100);
const amIArray = whatsMyType<Array<Number>>([1, 2, 3, 4, 5]);

console.log(amIString.split(' '));
console.log(amINumber.toString());
console.log(amIArray.toString());
export {};
