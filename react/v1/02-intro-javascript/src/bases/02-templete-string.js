const nombres = "Edual Dan";
const apellidos = "Sarmiento Garfias";

//Este es un template String
const nombreCompleto = `${nombres} ${apellidos}`;

console.log(nombreCompleto);

function getSaludo(nombre) {
  return "Hola "+nombre;
}

console.log(`Este es un texto: ${getSaludo(nombres)}`);
