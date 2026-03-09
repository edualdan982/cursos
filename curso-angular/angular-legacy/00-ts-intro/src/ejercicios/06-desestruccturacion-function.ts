
export interface Producto {
  desc: string;
  precio: number;
}

const telefono: Producto = {
  desc: "Nokia A1",
  precio: 150,
};

const tableta: Producto = {
  desc: "iPad Mini",
  precio: 500,
};

function calculaISV(productos: Producto[]): [number, number] {
  let total = 0;

  productos.forEach(({ precio }) => {
    total += precio;
  });

  return [total * 0.13, total];
}
const productos = [telefono, tableta];
const [isv, total] = calculaISV(productos);

console.log('Total: '+ total);
console.log('ISV: '+ isv);
