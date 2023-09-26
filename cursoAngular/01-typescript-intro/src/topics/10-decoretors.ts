function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = 'New Property';
    hello = 'override';
  };
}

@classDecorator
class SuperClass {
  public myPorperty: string = 'Abc1234';
  print() {
    console.log('Hola mundo');
  }
}

console.log(SuperClass);
const myClass = new SuperClass();
console.log(myClass);
