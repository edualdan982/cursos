import React from "react";
import PropTypes from "prop-types";

const newMessage = "Edual Dan";
const arreglo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const object = {
  message: "Hola mundo",
  title: "Edual Dan",
};

const obtenerTitulo = () => object.title;

export default function FirstApp({ titulo, subtitulo, name }) {
  if (!titulo) {
    throw new Error("El titulo no existe");
  }

  return (
    <>
      <h1 data-testid="test-title">{titulo}</h1>
      <p>{subtitulo}</p>
      <p>{subtitulo}</p>
      <code>{JSON.stringify(object)}</code>
      <br></br>
      <code>{obtenerTitulo()}</code>
    </>
  );
}

FirstApp.propTypes = {
  subtitulo: PropTypes.string,
  titulo: PropTypes.string.isRequired,
};

FirstApp.defaultProps = {
  subtitulo: "No hay subtítulo",
  titulo: "No hay título",
  name: "No hay nombre",
};
