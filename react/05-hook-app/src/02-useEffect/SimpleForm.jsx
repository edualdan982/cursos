import { useEffect, useState } from "react";
import { Message } from "./Message";

export const SimpleForm = () => {
  const [formState, setFormState] = useState({
    username: "strider",
    email: "correo@correo.com",
  });

  const { username, email } = formState;

  const onInputChange = ({ target }) => {
    const { value, name } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    // console.log("useEfecte called");
  }, []);

  useEffect(() => {
    // console.log("email called");
  }, [email]);

  useEffect(() => {
    // console.log("formState change");
  }, [formState]);

  

  return (
    <>
      <h1>Formulario simple: </h1>
      <hr />
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <input
        type="email"
        className="form-control mt-2"
        placeholder="edual@correo.com"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      {
        (username === 'strider2') && <Message/>
      }
    </>
  );
};
