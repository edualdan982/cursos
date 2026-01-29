import React from "react";

export const ShowImcrement = React.memo(({ increment }) => {
  console.log("Me volvi a generar :(");
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        increment(5);
      }}
    >
      Incrementar
    </button>
  );
});
