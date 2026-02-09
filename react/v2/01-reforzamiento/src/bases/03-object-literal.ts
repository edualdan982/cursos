const ironMan = {
  firstName: "Dan",
  lastName: "Sarmiento",
  age: 15,
  address: {
    postalCode:  'ABC123',
    city: 'New York'
  }
};

const spiderMan = structuredClone(ironMan);

ironMan.firstName = "Peter";
ironMan.lastName = "Parker";
spiderMan.age= 22;
spiderMan.address.city = 'San Jose';

console.log({ ironMan, spiderMan });
