import { useState } from "react";
import PropTypes from "prop-types";

//rafc para generar el codigo de funcional Component
export default function CounterApp({ title, value }) {
  const [counter, setCounter] = useState(value);

  // console.log('Render');
  // API... FETCH...
  const handleAdd = (event) => {
    // console.log(event);

    // setCounter(counter + 1 );
    setCounter((c) => c + 1);
  };
  const handleSubtract = (event) => {
    if (counter > 0) {
      setCounter((c) => c - 1);
    }
  };
  const reset = (event) => {
    setCounter(value);
  };

  return (
    <>
      <h1>{title}</h1>
      <h2>Contador:</h2>
      <h3 data-testid="test-counter">{counter}</h3>
      <button onClick={handleAdd}>+1</button>
      <button onClick={handleSubtract}>-1</button>
      <button data-testid="test-btn-reset" id="btn-reset" onClick={reset}>
        reset
      </button>
    </>
  );
}

CounterApp.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
};
CounterApp.defaultProps = {
  titulo: "CouterApp",
  value: 0,
};
