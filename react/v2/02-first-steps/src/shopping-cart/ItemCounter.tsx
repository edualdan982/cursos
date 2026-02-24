import { type CSSProperties } from "react";

interface Props {
  name: string;
  quantity?: number;
}

const sectionStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 10,
};

const spanStyles: CSSProperties = {
  width: 150,
};
export const ItemCounter = ({ name, quantity }: Props) => {
  const handleClick = () => {
    console.log(event);
    console.log(`Click ${name}`);
  };
  return (
    <section style={sectionStyles}>
      <span style={spanStyles}>{name}</span>
      <button
        onClick={() => handleClick()}
      >
        +1
      </button>
      <span>{quantity}</span>
      <button>-1</button>
    </section>
  );
};
