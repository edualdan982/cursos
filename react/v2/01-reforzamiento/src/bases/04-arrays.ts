const myArray: number[] = [1,2,3,4,5,6];

const myArray2 = structuredClone(myArray);

myArray2.push(7);
// myArray2.push('2');

console.log({myArray, myArray2});