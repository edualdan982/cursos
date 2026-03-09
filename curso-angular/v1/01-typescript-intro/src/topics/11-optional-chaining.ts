export interface Passenger {
  name: string;
  children?: string[];
}

const passenger1: Passenger = {
  name: 'Edual',
};
const passenger2: Passenger = {
  name: 'Helen',
  children: ['Natalia', 'Elizabteh'],
};

const returnPrintChildrenNumber = (passenger: Passenger) => {
  if (!passenger.children) return 0;
  const howManyChildren = passenger.children?.length;

  // console.log(howManyChildren);
  return howManyChildren;
};

console.log(returnPrintChildrenNumber(passenger1));
console.log(returnPrintChildrenNumber(passenger2));
