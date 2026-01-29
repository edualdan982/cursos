const { render, screen } = require("@testing-library/react");
const { GifExpertApp } = require("../src/GifExpertApp");
import React from 'react'

describe("Prueba en <GifExpertApp/>", () => {
  const category = "One Punch";

  test("debe hacer match con el snapshot", () => {
    const { container } = render(<GifExpertApp />);
    expect(container).toMatchSnapshot();
  });

  test("debe mostrar su titlo correcto con la etiqueta h1", () => {
    render(<GifExpertApp />);
    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBeTruthy();
  });

  test("debe verificar que se llame al useState de categories", () => {
    const setStateMock = jest.fn();
    const useStateMock = (useState) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    render(<GifExpertApp />);
    screen.debug();
  });
});
