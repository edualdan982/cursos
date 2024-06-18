const { render, screen, fireEvent } = require("@testing-library/react");
const { default: CounterApp } = require("../src/CounterApp");

describe("Prueba en <CounterApp/>", () => {
  test("debe hacer match con el snapshot", () => {
    // expect(render.debug()).toMatchSnapshot();

    const { container } = render(<CounterApp />);
    expect(container).toMatchSnapshot();
  });

  const initialValue = 100;
  test("debe de mostrar el valor inicial de 100", () => {
    render(<CounterApp value={initialValue} />);

    expect(screen.getByTestId("test-counter").innerHTML).toBe(
      initialValue.toString()
    );

    // ----tambien es valido buscar el valor 100 porque este deberia existir en algun lado del redenderizado

    // expect(screen.getByText(100)).toBeTruthy();

    // ----otra forma es buscar a nivel del h3 en mi caso con:

    // expect(screen.getByRole('heading', {level: 3}).innerHTML).toContain('100');
  });

  test("debe de incrementar con el boton +1", () => {
    render(<CounterApp value={initialValue} />);
    fireEvent.click(screen.getByText("+1"));

    expect(screen.getByText(initialValue + 1)).toBeTruthy();
  });

  test("debe de decrementar con el boton -1", () => {
    render(<CounterApp value={initialValue} />);
    fireEvent.click(screen.getByText("-1"));

    expect(screen.getByText(initialValue - 1)).toBeTruthy();
  });

  test("debe funcionar el boton de reset", () => {
    render(<CounterApp value={initialValue} />);
    fireEvent.click(screen.getByText("+1"));
    fireEvent.click(screen.getByText("+1"));
    fireEvent.click(screen.getByText("+1"));

    // fireEvent.click(screen.getByText("reset"));

    // fireEvent.click(screen.getByRole("button", { name : 'reset' }));
    fireEvent.click(screen.getByTestId("test-btn-reset"));
    expect(screen.getByTestId("test-counter").innerHTML).toBe(
      initialValue.toString()
     );
  });
});
