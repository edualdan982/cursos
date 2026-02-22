function greet(name: string) {
  return `Hola ${name}`;
}

const greet2 = (name: string) => `Hole ${name}`;

const message = greet("Edual");
const message2 = greet2("Edual");

console.log({ message, message2 });

interface User {
  firstName: string;
  uid: string;
  user: string;
}

function getUser(): User {
  return {
    firstName: "Edual Dan",
    uid: "ABC-123",
    user: "El_Papa23",
  };
}
const getUser2 = () => ({
  firstName: "Dan",
  uid: "ABC-1234",
  user: "EL_dios",
});

const user = getUser();
const user2 = getUser2();
console.log({ user, user2 });

const myNumbers: number[] = [1, 2, 3, 4, 5, 6];
// myNumbers.forEach((value) => console.log({value}));

myNumbers.forEach( console.log);
