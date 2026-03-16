function clasDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
  return class extends constructor {
    newProperty = "New Property";
    hello = "override";
  };
}

@clasDecorator
export class SuperClass {
  public newProperty: string = "ABC123";

  print() {
    console.log("Hola mundo");
  }
}
console.log(SuperClass);

const myClass = new SuperClass();
console.log(myClass);
