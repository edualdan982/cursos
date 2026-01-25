import { useState } from "react";

export const useCounter = (initialValue = 10) => {
  const [counter, setCounter] = useState(initialValue);

  //Forma 1
  const increment = (value = 1) => {
    setCounter((current) => current + value);
  };
  const decrement = (value = 1) => {
    if (counter === 0) return;
    setCounter((current) => current - value);
  };
  const reset = (value = 0) => {
    setCounter(initialValue);
  };

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
