import { useCounter } from "../hooks/useCounter";

export const CounterCustomHook = () => {
  const { counter, increment, decrement, reset } = useCounter();

  return (
    <>
      <h1>Counter with Hook: {counter}</h1>
      <hr />
      <button className="btn btn-primary" onClick={() => increment(2)}>
        +1
      </button>
      <button className="btn btn-primary" onClick={() => reset(2)}>
        Reset
      </button>
      <button className="btn btn-primary" onClick={() => decrement(2)}>
        -1
      </button>
    </>
  );
};
