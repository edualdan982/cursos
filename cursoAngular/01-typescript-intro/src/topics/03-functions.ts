function addNumbers(a: number, b: number) {
  return a + b;
}

const addNumbersArrow = (a: number, b: number) => {
  return `Suma: ${a + b}`;
};

function multiply(
  firstNumber: number,
  secondNumber?: number,
  base: number = 2
) {
  return firstNumber * base;
}

console.log(addNumbers(1, 2));
console.log(addNumbersArrow(1, 2));
console.log(multiply(10));

interface Character {
  name: string;
  hp: number;
  showHp: () => void;
}

const healCharacter = (character: Character, amount: number) => {
  character.hp += amount;
};
const strider: Character = {
  name: 'Strider',
  hp: 50,
  showHp() {
    console.log(`Puntos de vida ${this.hp}`);
  },
};
healCharacter(strider, 50);
healCharacter(strider, 51);


strider.showHp(); 
export {};
