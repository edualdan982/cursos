import { memo } from "react";

export const Small = memo(({ value }) => {
  console.log("Me volvie a dibujar");
  return <small>{value}</small>;
});
