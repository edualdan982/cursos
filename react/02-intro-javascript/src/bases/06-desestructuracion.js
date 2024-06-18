// Desestructuración
// Asignación desestructurante

const persona = {
  nombre: "Edual",
  edad: 25,
  clave: "DAN",
  rango: "Programador",
};

console.log(persona.nombre);
console.log(persona.edad);
console.log(persona.clave);

const { nombre, edad, clave } = persona;

console.log(nombre, edad, clave);

const retornaUsuario = (usuario) => {
  const { edad, clave, nombre } = usuario;

  console.log(edad, clave, nombre);
};

retornaUsuario(persona);

const retornaUsuario1 = ({ clave, nombre, edad, rango = "Capitan" }) => {
  // console.log(nombre, clave, rango);
  return {
    nombreClave: clave,
    anios: edad,
    latlng: {
      lat: 14.1232,
      lng: -12.3232,
    },
  };
};

const {
  nombreClave,
  anios,
  latlng: { lat, lng },
} = retornaUsuario1(persona);

console.log(nombreClave, anios, lat, lng);
