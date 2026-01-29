const saludar = function (nombre) {
  return `Hola ${nombre}`;
};

console.log(saludar("Edual Dan"));

console.log(saludar(30));

const saludar2 = (nombre) => {
  return `Hola ${nombre}`;
};

console.log(saludar2("Vegeta"));

const saludar3 = (nombre) => `Hola ${nombre}`;
console.log(saludar3("Goku"));

const saludar4 = () => `Hola mundo`;
console.log(saludar4());

const getUser = () => ({
  uid: "ABC123",
  username: "El_Papi1502",
});
console.log(getUser());

//Tarea:
// 1. Transaformar a una funcion de flecha
// 2. Tiene que retornar un objeto implicito
//  3. Pruebas

function getUserActivo(nombre) {
  return {
    uid: "ABC123",
    username: nombre,
  };
}

const usuarioActivo = getUserActivo("Edual");
console.log(usuarioActivo);

const usuarioActivo2 = (nombre) => ({
  uid: "ABC123",
  username: nombre,
});
console.log(usuarioActivo2('Edual'));
