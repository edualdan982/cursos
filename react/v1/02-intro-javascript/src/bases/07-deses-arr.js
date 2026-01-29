const personajes = ['Goku','Vegeta', 'Trunks'];

const [, p2, p3] = personajes;
console.log( p2, p3);

const retornaArreglo = () => {
  return ['ABC',123];
}

const [letras, numeros] = retornaArreglo();

console.log({letras, numeros});

//Tarea
// 1. el primer valor de arr se llamará nombre
// 2. se llamará setNombre
const useState = (value) => {
  return [value, () => {
    console.log('Hola mundo');
  }]
}

const [nombre, setNombre] = useState('Goku');
console.log({nombre, setNombre});
