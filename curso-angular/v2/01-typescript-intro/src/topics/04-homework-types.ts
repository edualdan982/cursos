/*
 ====== Código de Typescript ====== 
 */

interface SuperHero {
  name: string;
  age: number;
  address: Address;
  showAddress: () => string;
}

interface Address {
  strret: string;
  country: string;
  city: string;
}

const superHero: SuperHero = {
  name: "Spiderman",
  age: 30,
  address: {
    strret: "Main St",
    country: "USA",
    city: "NY",
  },
  showAddress() {
    return this.name + " , " + this.address.city + ", " + this.address.country;
  },
};

const address = superHero.showAddress();
console.log(address);

export {};
