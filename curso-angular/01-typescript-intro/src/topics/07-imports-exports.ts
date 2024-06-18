import { Product, taxCalculation } from './06-functions-destructuring';

const shoppingCart: Product[] = [
  {
    description: 'Nokia',
    price: 150.0,
  },
  {
    description: 'iPad',
    price: 50.0,
  },
];

//Tax=0.15
const [total, taxTotal] = taxCalculation({
  products: shoppingCart,
  tax: 0.15
});

console.log(`Total: ${total}`);
console.log(`Tax: ${taxTotal}`);
