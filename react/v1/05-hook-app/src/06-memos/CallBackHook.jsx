import React, { useCallback, useState } from "react";
import { ShowImcrement } from "./ShowImcrement";

export const CallBackHook = () => {
  const [counter, setCounter] = useState(10);

  const incrementFather = useCallback((value) => {
    setCounter((c) => c + value);
  }, []);

  return (
    <>
      <h1>useCallback Hook: {counter}</h1>
      <hr />

      <ShowImcrement increment={incrementFather} />
    </>
  );
};
