const { render, screen } = require("@testing-library/react");
const { GifItem } = require("../../src/components");

describe("Prueba en <GifItem/>", () => {
  const titleTest = "Gif Item";
  const urlTest = "https://testing.prueba";

  test("debe hacer match con el snapshot", async () => {
    const { container } = render(<GifItem title={titleTest} url={urlTest} />);
    expect(container).toMatchSnapshot();
  });

  test('debe monstrar el titulo correctamente', () => {
    render(<GifItem title={titleTest} url={urlTest} />);

    expect(screen.getByText(titleTest)).toBeTruthy();
    // expect(screen.getAllByText(urlTest).length).toBeGreaterThan(0);
  });

  test('debe ir el url y alt correctament en la imagen', () => {
    render(<GifItem title={titleTest} url={urlTest} />);

    const {src, alt} = screen.getByRole( "img");
    expect(src).toContain(urlTest);
    expect(alt).toBe(titleTest);
  });
});
