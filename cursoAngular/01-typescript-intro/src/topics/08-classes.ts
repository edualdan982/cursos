export class Person {
  // public name: string;
  // private address: string;

  constructor(
    public firsName: string,
    public lastName: string,
    private address: string = 'No address'
  ) {
    this.firsName = firsName;
    this.lastName = lastName;
  }
}

export class Hero {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
    public person: Person
  ) {
    this.realName = realName;
    this.age = age;
    this.alterEgo = alterEgo;

    this.person = new Person(realName, '');
  }
}

const tony = new Person('Tony Stark', 'New York');
const ironMan = new Hero('IronMan', 45, 'Tony', tony);

console.log(ironMan);
