import { useRef } from "react";

export const FocusScreen = () => {
  const inputRef = useRef();
  const onClick = () => {
    // document.querySelector('input').select();
    inputRef.current.select();
  };

  return (
    <>
      <h1>Focus Screen</h1>
      <hr />
      <input
        ref={inputRef}
        type="text"
        placeholder="Ingrese un nombre"
        className="form-control"
      />
      <button className="btn btn-primary m-2" onClick={onClick}>
        Set focus
      </button>
    </>
  );
};
