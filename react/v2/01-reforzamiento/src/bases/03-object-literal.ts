interface Person {
  firstName: string;
  lastName: string;
  age: number;
  address: Address
}

interface Address  {
   postalCode: string,
   city: string 
  };

const ironMan = {
  firstName: "Dan",
  lastName: "Sarmiento",
  age: 15,
  address: {
    postalCode:  'ABC123',
    city: 'New York'
  }
};

const spiderMan: Person = structuredClone(ironMan);

ironMan.firstName = "Peter";
ironMan.lastName = "Parker";
spiderMan.age= 22;
spiderMan.address.city = 'San Jose';

console.log({ ironMan, spiderMan });
