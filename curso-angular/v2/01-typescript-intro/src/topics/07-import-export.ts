import { type Product, taxCalculation } from "./06-function-destructuring";

const shoppingCart: Product[] = [
  {
    description: "Tecno Spark go",
    price: 200,
  },
  {
    description: "iPad Air",
    price: 150,
  },
];

// Tax = 0.15
const [total, tax] = taxCalculation({
  products: shoppingCart,
  tax: 0.15,
});

console.log("Total:", total);
console.log("Tax:", tax);
