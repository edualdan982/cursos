import { ItemCounter } from "./shopping-cart/ItemCounter";

interface ItemInCart {
  productName: string;
  quantity: number;
}

const itemsInCart: ItemInCart[] = [
  { productName: "Nintendo Switch 2", quantity: 1 },
  { productName: "Pro controller", quantity: 2 },
  { productName: "Super smash", quantity: 5 },
];
export function FirstStepsApp() {
  return (
    <>
      <h1>Carrito de Compras</h1>
      {itemsInCart.map(({ productName, quantity }) => (
        <ItemCounter name={productName} quantity={quantity} key={productName}/>
      ))}
      {/* <ItemCounter name="Nintendo Switch" quantity={10}/>
      <ItemCounter name="Pro Controller" quantity={11}/>
      <ItemCounter name="Pc master raze" quantity={12}/>
      <ItemCounter name="Super Mario" quantity={13}/>
      <ItemCounter name="Super Smash" quantity={14}/> */}
    </>
  );
}
