import { describe, expect, test } from "vitest";
import { MyAwesomeApp } from "./MyAwesomeApp";
import { render, screen } from "@testing-library/react";

describe("MyAwesomeApp", () => {
  test("should render firstname and lastname", () => {
    // Usar Render inicial siempre y cambios los eventos no cambien los valores  de otra manera usar screen.
    const { container } = render(<MyAwesomeApp />);
    // screen.debug();

    const h1 = container.querySelector("h1");
    console.log(h1?.innerHTML);
    expect(h1?.innerHTML).toContain("Edual Dan");

    const h3 = container.querySelector("h3");
    console.log(h3?.innerHTML);
    expect(h3?.innerHTML).toContain("Sarmiento Garfias");
  });

  test("should render firstname and lastname - screen", () => {
    render(<MyAwesomeApp />);
    screen.debug();

    // const h1 = screen.getByRole("heading", { level: 1 });
    const h1 = screen.getByTestId("first-name-title");
    expect(h1.innerHTML).toContain('Edual Dan');
  });

  test("should match snapshot", ()=>{
    const {container} = render(<MyAwesomeApp/>);

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot", ()=>{
    render(<MyAwesomeApp/>);
    
    console.log(screen);
    expect(screen.getByTestId('div-app')).toMatchSnapshot();
  });
});
