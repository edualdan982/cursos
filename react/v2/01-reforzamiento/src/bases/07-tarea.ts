// La función puede ser enviada directamente en arreglo que se devuelve
const setValue = (value: string) => {
  console.log(`SetValue: ${value}`);
//   value = value
};
const useState = (value: string) => {
  return [value, setValue] as const;
};

const [name, setName] = useState("Goku");

console.log(name);
setName("Vegeta");

console.log(name);

