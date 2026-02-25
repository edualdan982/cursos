import { useState } from "react";
// import "./ItemCounter.css";
import styles from './ItemCounter.module.css';

interface Props {
  name: string;
  quantity?: number;
}

// const sectionStyles: CSSProperties = {
//   display: "flex",
//   alignItems: "center",
//   gap: 10,
//   marginTop: 10,
// };

// const spanStyles: CSSProperties = {
//   width: 150,
// };
export const ItemCounter = ({ name, quantity = 0 }: Props) => {
  const [count, setCount] = useState<number>(quantity);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubtract = () => {
    if (count === 0) return;
    setCount(count - 1);
  };
  return (
    <section className={styles.itemRow}>
      <span className={styles.itemText} style={{ color: count === 1 ? "red" : "black" }}>{name}</span>
      <button onClick={handleAdd}>+1</button>
      <span>{count}</span>
      <button className={styles['color-red']} onClick={handleSubtract}>-1</button>
    </section>
  );
};
