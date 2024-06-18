const { render, screen } = require("@testing-library/react");
const { default: FirstApp } = require("../src/FirstApp");

describe("Prueba en <FirstApp />", () => {
  const title = "Hola, Soy Goku";
  const subTitle = "Soy subtitulo";

  test("debe de hacer match con el snapshot", () => {
    const { container } = render(<FirstApp titulo={title} />);
    expect(container).toMatchSnapshot();
  });

  test('debe mostrar el mensaje "Hola, Soy Goku"', () => {
    render(<FirstApp titulo={title} />);
    // screen.debug();
    expect(screen.getByText(title)).toBeTruthy();
  });

  test("debe mostrar el titulo en un h1", () => {
    render(<FirstApp titulo={title} />);
    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      title
    );
  });

  test("debe mostrar el subtitulo enviad por props", () => {
    render(<FirstApp titulo={title} subtitulo={subTitle} />);
    expect(screen.getAllByText(subTitle).length).toBe(2);
  });
});
