const persona = {
  nombres: 'Edual Dan',
  apellidos: 'Sarmiento Garfias',
  edad: 24,
  direccion: {
    ciudad: 'Bolivia',
    zip: 1245462,
    lat: 14.3232,
    lng: 34.9533321
  }
};

console.log({persona});

console.table({persona});

const persona2 = {...persona};

persona2.nombres = 'Dan';

console.log(persona2);
console.log(persona);