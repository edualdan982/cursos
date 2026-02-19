const charactersName = ["Goku", "Vegeta", "Trunks"];

const [, , p3] = charactersName;

console.log({ p3 });

const returnsArrayFn = () => {
  return ["ABC", 1234] as const;
};

const [letters, numbers] = returnsArrayFn();


console.log({ letters, numbers });


const useState= (value: string) => {
  return [
    value,
    (newValue: string) =>{
      console.log(`newValue: ${newValue}`);
    }
  ] as const
}

const [name, setName] = useState('Goku');
console.log(name);       // Goku
setName('Vegeta');       // Imprime "Vegeta"